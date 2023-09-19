import WebSocket from 'ws';
import { Subscriber } from "@/types/Subscriber";
import expressWs from "express-ws";
import { ApiModuleInterface } from "@/types/ApiModuleInterface";
import { SubscriptionInterface } from "@/types/SubscriptionInterface";

export class WsClientModule implements ApiModuleInterface, SubscriptionInterface {
  ws: WebSocket;
  subscribers: Subscriber[] = [];

  constructor (private readonly url: string) {
    this.ws = new WebSocket(this.url);
    this.ws.on('error', (err: Error) => {
      throw new Error(err.message);
    });
  }

  registerHandlers(): void {
    this.ws.on('message', (data: WebSocket.RawData) => {
      try {
        const message = JSON.parse(data.toString());
        this.subscribers.forEach((subscription) => subscription(message));
      } catch (err: unknown) {
        console.log((err as Error).message);
      }
    });
  }

  subscribe(handler: Subscriber): void {
    this.subscribers.push(handler);
  }
}