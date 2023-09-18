import { configDotenv } from 'dotenv';
import { env } from 'process';

import { Environment } from "@/types/Environment";

const config = configDotenv({ path: __dirname + '/../../.env' });

export class ConfigService {
  get(name: Environment): string {
    return env[name] || config.parsed![name] || '';
  }
}
