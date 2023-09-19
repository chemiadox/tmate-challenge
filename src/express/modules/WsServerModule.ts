import * as WS from 'ws';
import expressWs from 'express-ws';
import { Request } from 'express';

import { ApiModuleInterface } from "@/types/ApiModuleInterface";
import { ConfigService } from "@/services/ConfigService";
import { Environment } from "@/types/Environment";
import { AuthService } from "@/services/AuthService";
import {
  UserRequest,
  UserRequestAction,
  WebSocketCloseCodes,
  WebSocketCloseMessages,
} from "@/types/WebSocket";
import { WsClientModule } from "@/express/modules/WsClientModule";
import { PlayerState } from "@/types/PlayerState";
import { GameState } from "@/types/GameState";
import { SubscriptionFilters } from "@/types/SubscriptionFilters";
import { gameToFreeTable, gameToOccupiedTable } from "@/helpers/transformers";

export class WsServerModule implements ApiModuleInterface {
  filters: SubscriptionFilters = {};

  constructor (
    private readonly configService: ConfigService,
    private readonly authService: AuthService,
  ) {}

  registerHandlers(express: expressWs.Instance): void {
    const { app } = express;
    const route = this.configService.get(Environment.WS_ROUTE);

    if (!route.length) {
      throw new Error(`Cannot register http handler for ${WsServerModule.name}`);
    }

    app.ws(route, (ws: WS, req: Request) => {
      if (!this.authService.isAuthorized(req)) {
        ws.close(WebSocketCloseCodes.Unauthorized, WebSocketCloseMessages.Unauthorized);
        return;
      }

      // this.userWebSocketService.onMessage((data: Object): void => {
      //   const playerState = data as PlayerState;
      // });
      //
      // this.roomWebSocketService.onMessage((data: Object): void => {
      //   const gameState = data as GameState;
      //
      //   if (gameState.seats && gameState.seats.length && this.filters.occupiedTable) {
      //     ws.send(JSON.stringify(gameToOccupiedTable(gameState)));
      //   }
      //
      //   if ((!gameState.seats || !gameState.seats.length) && this.filters.freeTable) {
      //     ws.send(JSON.stringify(gameToFreeTable(gameState)));
      //   }
      // });

      ws.on('message', (data: WS.RawData) => {
        try {
          this.dispatch(ws, data);
        } catch (err: unknown) {
          ws.send((err as Error).message);
        }
      });
    });
  }

  private dispatch(ws: WS, data: WS.RawData) {
    const message = JSON.parse(data.toString()) as UserRequest;

    if (message.action === UserRequestAction.Subscribe) {
      this.filters = message.filters;

      ws.send(JSON.stringify(this.filters));
      return;
    }

    throw new Error('Not implemented');
  }
}
