import { GameState } from "@/types/GameState";
import { FreeTable, OccupiedTable } from "@/types/Tables";

export function gameToOccupiedTable(gameState: GameState): OccupiedTable {
  return {
    gameType: gameState.gameType,
    bbAtCents: gameState.bbInCents,
    anteAtCents: gameState.anteInCents,
    organizationId: gameState.organizationId,
    size: gameState.size,
    occupiedSeatsCount: gameState.seats.length,
  } as OccupiedTable;
}

export function gameToFreeTable(gameState: GameState): FreeTable {
  return {
    gameType: gameState.gameType,
    bbAtCents: gameState.bbInCents,
    anteAtCents: gameState.anteInCents,
    organizationId: gameState.organizationId,
    size: gameState.size,
  } as FreeTable;
}
