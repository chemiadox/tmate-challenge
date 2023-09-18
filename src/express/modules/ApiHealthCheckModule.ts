import expressWs from 'express-ws';
import { Request, Response } from "express";

import { ApiModuleInterface } from "@/types/ApiModuleInterface";
import { Environment } from "@/types/Environment";
import { ConfigService } from "@/services/ConfigService";

export class ApiHealthCheckModule implements ApiModuleInterface {
  constructor (protected readonly configService: ConfigService) {}
  registerHandlers (express: expressWs.Application): void {
    const route = this.configService.get(Environment.GET_HEALTH_CHECK_ROUTE);

    if (!route) {
      throw new Error(`Cannot register http handler for ${ApiHealthCheckModule.name}`);
    }

    express.get(route, (req: Request, res: Response) => {
      res.send('ok');
    });
  }
}
