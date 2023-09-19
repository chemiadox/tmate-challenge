import { ExpressApp } from "./ExpressApp";
import { ApiModuleInterface } from "../types/ApiModuleInterface";
import { ConfigService } from "../services/ConfigService";
import { Environment } from "../types/Environment";

jest.mock('express-ws');
import expressWs from "express-ws";

class MockConfigService {
  get = jest.fn();
}

class MockApiModule {
  registerHandlers = jest.fn();
}

class MockExpressWsApp {
  app = {
    listen: jest.fn(),
  }
}

describe(ExpressApp, () => {
  const mockedConfigService = new MockConfigService() as unknown as ConfigService;
  const mockedApiModule = new MockApiModule() as unknown as ApiModuleInterface;
  const mockedExpressWsApp = new MockExpressWsApp();

  // @ts-ignore
  expressWs.mockReturnValue(mockedExpressWsApp);

  it('Should execute starting sequence and run application', () => {
    const spyConfigGet = jest.spyOn(mockedConfigService, 'get');
    const spyExpressWsApp = jest.spyOn(mockedExpressWsApp.app, 'listen')
      .mockImplementation((port: string, callback: () => void) => {
        callback();
      });
    const spyMockedModule = jest.spyOn(mockedApiModule, 'registerHandlers');
    const spyConsoleLog = jest.spyOn(global.console, 'log');

    const app = new ExpressApp(mockedConfigService, [mockedApiModule, mockedApiModule]);

    app.start();

    expect(spyConfigGet).toBeCalledWith(Environment.HTTP_PORT);
    expect(spyExpressWsApp).toBeCalled();
    expect(spyMockedModule).toBeCalledTimes(2);
    expect(spyConsoleLog).toBeCalled();
  });
});
