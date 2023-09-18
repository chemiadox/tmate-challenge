import { Request } from 'express';
import expressWs from 'express-ws';
import * as WS from 'ws';
import { ApiModuleInterface } from "@/types/ApiModuleInterface";
import { ConfigService } from "@/services/ConfigService";
import { Environment } from "@/types/Environment";
import { AuthService } from "@/services/AuthService";
import { WebSocketCloseCodes, WebSocketCloseMessages } from "@/types/WebSocket";

export class WsModule implements ApiModuleInterface {
  constructor (
    protected readonly configService: ConfigService,
    protected readonly authService: AuthService,
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

      ws.send('ok');
    });
  }
}