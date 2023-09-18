import { ApiModuleInterface } from "@/types/ApiModuleInterface";
import { Express, Request, Response } from "express";
import { Environment } from "@/types/Environment";
import { ConfigService } from "@/services/ConfigService";

export class ApiHealthCheckModule implements ApiModuleInterface{
  constructor (protected readonly configService: ConfigService) {}
  registerHandlers (express: Express): void {
    const route = this.configService.get(Environment.GET_HEALTH_CHECK_ROUTE);

    if (!route) {
      throw new Error(`Cannot register http handler for ${ApiHealthCheckModule.name}`);
    }

    express.get(route, (req: Request, res: Response) => {
      res.send('ok');
    });
  }
}