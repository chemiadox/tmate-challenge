import { Request } from "express";
import { ConfigService } from "@/services/ConfigService";
import { Environment } from "@/types/Environment";

export class AuthService {
  constructor (private readonly configService: ConfigService) {}

  isAuthorized(request: Request): boolean {
    return request.headers.authorization === this.configService.get(Environment.MOCKED_TOKEN);
  }
}
