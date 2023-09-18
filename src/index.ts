import 'module-alias/register';
import { ConfigService } from '@/services/ConfigService';
import { ExpressApp } from "@/express/ExpressApp";
import { ApiHealthCheckModule } from "@/express/modules/ApiHealthCheckModule";
import { WsModule } from "@/express/modules/WsModule";
import { AuthService } from "@/services/AuthService";
import { WebSocketService } from "@/services/WebSocketService";
import { Environment } from "@/types/Environment";

const configService: ConfigService = new ConfigService();
const authService: AuthService = new AuthService(configService);

const userUrl = configService.get(Environment.WS_USER_SERVICE_URL);
const userWebSocketService = new WebSocketService(userUrl);

const gameUrl = configService.get(Environment.WS_GAME_SERVICE_URL);
const gameWebSocketService = new WebSocketService(gameUrl);


(async (): Promise<void> => {
  const app: ExpressApp = new ExpressApp(
    configService,
    [
      new ApiHealthCheckModule(configService),
      new WsModule(
        configService,
        authService,
        userWebSocketService,
        gameWebSocketService,
      ),
    ]
  );

  app.start();
})();
