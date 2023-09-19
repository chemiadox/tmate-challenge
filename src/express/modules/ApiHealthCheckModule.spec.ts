import expressWs from "express-ws";
import { Environment } from "@/types/Environment";
import { ApiHealthCheckModule } from "./ApiHealthCheckModule";
import { ConfigService } from "../../services/ConfigService";
import { DotenvConfigOutput } from "dotenv";

class MockConfigService {
  config: DotenvConfigOutput = { };
  get = jest.fn();
}

class MockExpressWsInstance {
  app = {
    get: jest.fn(),
  };
}

class MockResponse {
  send = jest.fn();
}

describe(ApiHealthCheckModule, () => {
  const mockedConfigService = new MockConfigService();
  const mockedExpressWsInstance = new MockExpressWsInstance();
  const mockedResponse = new MockResponse();
  const route = '/health';

  it('Should register handler', () => {
    const spyResponseSend = jest.spyOn(mockedResponse, 'send');
    const spyConfigGet = jest.spyOn(mockedConfigService, 'get').mockReturnValue(route);
    const spyExpressAppGet = jest.spyOn(mockedExpressWsInstance.app, 'get')
      .mockImplementation((route: string, callback: (req: Request, res: Response) => void) => {
        callback({} as unknown as Request, mockedResponse as unknown as Response);
      });

    const service = new ApiHealthCheckModule(mockedConfigService as unknown as ConfigService);

    service.registerHandlers(mockedExpressWsInstance as unknown as expressWs.Instance);

    expect(spyConfigGet).toBeCalledWith(Environment.GET_HEALTH_CHECK_ROUTE);
    expect(spyExpressAppGet).toBeCalledWith(route, expect.any(Function));
    expect(spyResponseSend).toBeCalledWith('Online');
  });

  it('Should fail registering if the route is empty', () => {
    const service = new ApiHealthCheckModule(mockedConfigService);
    const spyConfigGet = jest.spyOn(mockedConfigService, 'get').mockReturnValue('');

    expect(() => {
      service.registerHandlers(mockedExpressWsInstance as unknown as expressWs.Instance);
    }).toThrow(Error);
  });
});