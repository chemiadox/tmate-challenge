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
const userWebSocketService = new WebSocketService(configService.get(Environment.WS_USER_SERVICE_URL));
const roomWebSocketService = new WebSocketService(configService.get(Environment.WS_ROOM_SERVICE_URL));

(async (): Promise<void> => {
  const app: ExpressApp = new ExpressApp(
    configService,
    [
      new ApiHealthCheckModule(configService),
      new WsModule(
        configService,
        authService,
        userWebSocketService,
        roomWebSocketService,
      ),
    ]
  );

  app.start();
})();
