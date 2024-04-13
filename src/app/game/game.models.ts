export interface Player {
    id: number;
    name: string;
  }
  
export interface Hole {
  number: number;
  name: string;
  par: number;
}

export interface PlayerScore {
  playerId: number;
  holeNumber: number;
  score: number;
}

export interface Game {
  players: Player[];
  holes: Hole[];
  scores: PlayerScore[];
}