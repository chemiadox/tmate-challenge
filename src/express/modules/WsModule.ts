import { Request } from 'express';
import expressWs from 'express-ws';
import * as WS from 'ws';
import { ApiModuleInterface } from "@/types/ApiModuleInterface";
import { ConfigService } from "@/services/ConfigService";
import { Environment } from "@/types/Environment";
import { AuthService } from "@/services/AuthService";
import { UserRequest, UserRequestAction, WebSocketCloseCodes, WebSocketCloseMessages } from "@/types/WebSocket";
import { WebSocketService } from "@/services/WebSocketService";

export class WsModule implements ApiModuleInterface {
  constructor (
    private readonly configService: ConfigService,
    private readonly authService: AuthService,
    private readonly userWebSocketService: WebSocketService,
    private readonly roomWebSocketService: WebSocketService,

  ) {}
  registerHandlers (express: expressWs.Application): void {
    const route = this.configService.get(Environment.WS_ROUTE);

    if (!route) {
      throw new Error(`Cannot register http handler for ${WsModule.name}`);
    }

    express.ws(route, (ws: WS, req: Request) => {
      if (!this.authService.isAuthorized(req)) {
        ws.close(WebSocketCloseCodes.Unauthorized, WebSocketCloseMessages.Unauthorized);
        return;
      }

      ws.on('message', (data: WS.RawData) => {
        try {
          const message = JSON.parse(data.toString()) as UserRequest;

          if (message.action === UserRequestAction.Subscribe) {
            ws.send('Filtering');
            return;
          }

          throw new Error('Not implemented');
        } catch (err: unknown) {
          ws.send((<Error>err).message);
        }
      })
    });
  }
}