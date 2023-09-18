import { ConfigService } from '@/services/ConfigService';
import { Environment } from '@/types/Environment';
import express from 'express';
import { ApiModuleInterface } from "@/types/ApiModuleInterface";
import expressWs from "express-ws";

export class ExpressApp {
  constructor (
    private readonly config: ConfigService,
    private readonly apiModules: ApiModuleInterface[],
  ) {}

  start() {
    const app: expressWs.Application = expressWs(express()).app;
    const port = this.config.get(Environment.HTTP_PORT);

    this.apiModules.forEach((module: ApiModuleInterface) => {
      module.registerHandlers(app);
    });

    app.listen(port, () => {
      console.log(`HTTP server started at ${new Date()} on ${port}`);
    });
  }
}
