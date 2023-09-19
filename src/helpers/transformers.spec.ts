import { gameToFreeTable, gameToOccupiedTable } from "./transformers";
import { GameState, GameType, ParticipantState } from "../types/GameState";
import { FreeTable, OccupiedTable } from "../types/Tables";

const participantState: ParticipantState =  {
  playerId: 'playerId',
  stackAtCents: 100,
  cards: ['a', 'b'],
}

const gameState: GameState = {
  gameType: GameType.NLH,
  bbInCents: 100,
  anteInCents: 100,
  organizationId: 'orgId',
  size: 5,
  seats: [participantState],
}

const expectedOccupied: OccupiedTable = {
  gameType: gameState.gameType,
  bbAtCents: gameState.bbInCents,
  anteAtCents: gameState.anteInCents,
  organizationId: gameState.organizationId,
  size: gameState.size,
  occupiedSeatsCount: gameState.seats.length,
}

const expectedFree: FreeTable = {
  gameType: gameState.gameType,
  bbAtCents: gameState.bbInCents,
  anteAtCents: gameState.anteInCents,
  organizationId: gameState.organizationId,
  size: gameState.size,
}

describe('Transformer functions', () => {
  it(gameToOccupiedTable.name, () => {
    const result = gameToOccupiedTable(gameState);

    expect(result).toEqual(expectedOccupied);
  });

  it(gameToFreeTable.name, () => {
    const result = gameToFreeTable(gameState);

    expect(result).toEqual(expectedFree);
  });
});
