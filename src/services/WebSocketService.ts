import WebSocket from 'ws';

export class WebSocketService {
  ws: WebSocket;

  constructor (private readonly url: string) {
    this.ws = new WebSocket(this.url);
    this.ws.on('error', (err: Error) => {
      throw new Error(err.message);
    });
  }

  onMessage(listener: (data: object) => void) {
    this.ws.on('message', (data: WebSocket.RawData) => {
      try {
        const message = JSON.parse(data.toString());
        listener(message);
      } catch (err: unknown) {
        console.log((err as Error).message);
      }
    });
  }
}