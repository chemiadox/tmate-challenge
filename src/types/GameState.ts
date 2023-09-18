export enum GameType {
  NLH ='NLH', PLO = 'PLO'
}

export type ParticipantState = {
  playerId: string;
  stackAtCents: number;
  cards: string[];
}

export type GameState = {
  gameType: GameType,
  bbInCents: number,
  anteInCents: number | undefined,
  organizationId: string,
  size: number,
  seats: Array<ParticipantState>,
}
