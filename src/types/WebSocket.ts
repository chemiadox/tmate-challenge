export enum WebSocketCloseCodes {
  Unauthorized = 4001,
}

export enum WebSocketCloseMessages {
  Unauthorized= 'Unauthorized',
}

export enum UserRequestAction {
  Subscribe = 'subscribe',
}

export type UserRequest = {
  action: UserRequestAction;
  filters: object;
}
