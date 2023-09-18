import { Express } from "express";

export interface ApiModuleInterface {
  registerHandlers(express: Express): void;
}
