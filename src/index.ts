import 'module-alias/register';
import { ConfigService } from '@/services/ConfigService';
import { ExpressApp } from "@/express/ExpressApp";
import { ApiHealthCheckModule } from "@/express/modules/ApiHealthCheckModule";
import { WsModule } from "@/express/modules/WsModule";
import { AuthService } from "@/services/AuthService";

const configService: ConfigService = new ConfigService();
const authService: AuthService = new AuthService(configService);

(async (): Promise<void> => {
  const app: ExpressApp = new ExpressApp(
    configService,
    [
      new ApiHealthCheckModule(configService),
      new WsModule(configService, authService),
    ]
  );

  app.start();
})();
