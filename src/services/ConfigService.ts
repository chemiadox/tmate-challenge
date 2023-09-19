import { configDotenv, DotenvConfigOutput } from 'dotenv';
import { env } from 'process';

import { Environment } from "@/types/Environment";

export class ConfigService {
  config: DotenvConfigOutput;

  constructor() {
    this.config = configDotenv({ path: __dirname + '/../../.env' });
  }
  get(name: Environment): string {
    return env[name] || (this.config?.parsed ? this.config.parsed[name] : '');
  }
}
