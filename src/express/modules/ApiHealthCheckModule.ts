import expressWs from 'express-ws';
import { Request, Response } from "express";

import { ApiModuleInterface } from "@/types/ApiModuleInterface";
import { Environment } from "@/types/Environment";
import { ConfigService } from "@/services/ConfigService";

export class ApiHealthCheckModule implements ApiModuleInterface {
  constructor (protected readonly configService: ConfigService) {}
  registerHandlers(express: expressWs.Instance): void {
    const route = this.configService.get(Environment.GET_HEALTH_CHECK_ROUTE);
    const { app } = express;

    if (!route.length) {
      throw new Error(`Cannot register http handler for ${ApiHealthCheckModule.name}`);
    }

    app.get(route, (req: Request, res: Response) => {
      res.send('Online');
    });
  }
}
