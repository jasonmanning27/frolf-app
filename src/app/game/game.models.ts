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

export interface GameWithRounds {
  //gameID: number;
  rounds: Round[];
  winner: Player[];
  gameID: number;
  date: string;
}

// Generate a round object for each player/team.  Store a list of rounds in a game object for easier searching / round attribution. 
export interface Round {
  

  // Properties of game
  date: string; // This will be a string of the date the round was initilaized at. may be moved to game
  soloGame: boolean; // if True Solo : if false, teams / may be mvoed to game
  
  players: Player[];
  overall_score: number;
  score_array: number[]; // Going to switch to an array of numbers for simplicty. 
  holes: Hole[]; // Course // may be moved to game.
  
}