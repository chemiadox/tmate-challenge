import expressWs from "express-ws";

export interface ApiModuleInterface {
  registerHandlers(express: expressWs.Application): void;
}
