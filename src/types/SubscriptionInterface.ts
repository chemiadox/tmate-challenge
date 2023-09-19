import { Subscriber } from "@/types/Subscriber";

export interface SubscriptionInterface {
  subscribe(handler: Subscriber): void;
}