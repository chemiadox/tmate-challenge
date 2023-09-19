jest.mock('ws');
import WebSocket from 'ws';

import { WsClientModule } from './WsClientModule';

const wsFakeUrl = 'wss://does.not.matter.com/ws';
const mockedWs = {
  on: jest.fn(),
}
describe(WsClientModule, () => {
  beforeEach(() => {
    jest.resetAllMocks();
  })

  it('Should establish websocket connection', () => {
    // @ts-ignore
    WebSocket.mockReturnValue(mockedWs);
    const spyWsOn = jest.spyOn(mockedWs, 'on')
      .mockImplementation((event: string, callback: (err: Error) => void) => {});

    new WsClientModule(wsFakeUrl);

    expect(spyWsOn).toBeCalledWith('error', expect.any(Function));
  });

  it('Should throw on connection error', () => {
    // @ts-ignore
    WebSocket.mockReturnValue(mockedWs);
    jest.spyOn(mockedWs, 'on').mockImplementation((event: string, callback: (err: Error) => void) => {
      callback(new Error('test error'));
    });

    expect(() => {
      const service = new WsClientModule(wsFakeUrl);
    }).toThrow('test error');
  });
})