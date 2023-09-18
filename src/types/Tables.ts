import { GameType } from "@/types/GameState";

export type OccupiedTable = {
  gameType: GameType;
  bbAtCents: number;
  anteAtCents?: number;
  organizationId: string;
  size: number;
  occupiedSeatsCount: number;
};

export type FreeTable = Omit<OccupiedTable, 'occupiedSeatsCount'>;
