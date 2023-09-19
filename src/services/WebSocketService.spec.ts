jest.mock('ws');
import WebSocket from 'ws';

import { WebSocketService } from './WebSocketService';

const wsFakeUrl = 'wss://does.not.matter.com/ws';
const mockedWs = {
  on: jest.fn(),
}
describe(WebSocketService, () => {
  beforeEach(() => {
    jest.resetAllMocks();
  })

  it('Should establish websocket connection', () => {
    // @ts-ignore
    WebSocket.mockReturnValue(mockedWs);
    const spyWsOn = jest.spyOn(mockedWs, 'on')
      .mockImplementation((event: string, callback: (err: Error) => void) => {});

    new WebSocketService(wsFakeUrl);

    expect(spyWsOn).toBeCalledWith('error', expect.any(Function));
  });

  it('Should throw on connection error', () => {
    // @ts-ignore
    WebSocket.mockReturnValue(mockedWs);
    jest.spyOn(mockedWs, 'on').mockImplementation((event: string, callback: (err: Error) => void) => {
      callback(new Error('test error'));
    });

    expect(() => {
      const service = new WebSocketService(wsFakeUrl);
    }).toThrow('test error');
  });

  it('Should register onMessage handler and get json message', () => {
    const fakeData = Buffer.from('{"some": "value"}') as WebSocket.RawData;
    const expectedOutput = { some: 'value' };
    const listener = jest.fn();

    const service = new WebSocketService(wsFakeUrl);

    const spyWsOn = jest.spyOn(service.ws, 'on')
      // @ts-ignore
      .mockImplementation((event: string, callback: (data: WebSocket.RawData) => void) => {
        callback(fakeData);
      });


    service.onMessage(listener);

    expect(spyWsOn).toBeCalledWith('message', expect.any(Function));
    expect(listener).toBeCalledWith(expectedOutput);
  });

  it('Should register onMessage handler and throw on bad data', () => {
    const fakeData = Buffer.from('bad_data') as WebSocket.RawData;
    const listener = jest.fn();

    const service = new WebSocketService(wsFakeUrl);

    const spyWsOn = jest.spyOn(service.ws, 'on')
      // @ts-ignore
      .mockImplementation((event: string, callback: (data: WebSocket.RawData) => void) => {
        callback(fakeData);
      });
    const spyOnLog = jest.spyOn(console, 'log');

    service.onMessage(listener);

    expect(spyWsOn).toBeCalledWith('message', expect.any(Function));
    expect(spyOnLog).toBeCalledWith(expect.stringContaining('Unexpected token'));
  });
})