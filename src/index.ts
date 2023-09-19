import 'module-alias/register';
import { ConfigService } from '@/services/ConfigService';
import { ExpressApp } from "@/express/ExpressApp";
import { ApiHealthCheckModule } from "@/express/modules/ApiHealthCheckModule";
import { WsServerModule } from "@/express/modules/WsServerModule";
import { AuthService } from "@/services/AuthService";
import { WsClientModule } from "@/express/modules/WsClientModule";
import { Environment } from "@/types/Environment";

const configService: ConfigService = new ConfigService();
const authService: AuthService = new AuthService(configService);

const userUrl = configService.get(Environment.WS_USER_SERVICE_URL);
const userWebSocketService = new WsClientModule(userUrl);

const gameUrl = configService.get(Environment.WS_GAME_SERVICE_URL);
const gameWebSocketService = new WsClientModule(gameUrl);


(async (): Promise<void> => {
  const app: ExpressApp = new ExpressApp(
    configService,
    [
      new ApiHealthCheckModule(configService),
      new WsServerModule(
        configService,
        authService,
      ),
    ]
  );

  app.start();
})();
