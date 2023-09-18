import 'module-alias/register';
import { ConfigService } from '@/services/ConfigService';
import { ExpressApp } from "@/express/ExpressApp";
import { ApiHealthCheckModule } from "@/express/modules/HealthCheckModule";

const config: ConfigService = new ConfigService();

(async (): Promise<void> => {
  const app: ExpressApp = new ExpressApp(
    config,
    [
      new ApiHealthCheckModule(config),
    ]
  );

  app.start();
})();
