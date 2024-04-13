import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Game, Player } from '../game/game.models';
import { NEW_HOLES } from './holes.constant';

@Injectable({
  providedIn: 'root'
})

export class GameService {

  private gameSubject = new BehaviorSubject<Game | null>(null);
  game$ = this.gameSubject.asObservable();

  private gamesHistory: Game[] = []; // Array to store the history of games


  constructor() { }

  getGamesHistory(): Game[] {
    return this.gamesHistory; // Return a copy if you want to prevent outside modifications
  }
    
  submitGame(game: Game) {
    this.gamesHistory.push(game); // Store the new game in history
    console.log("pushed to game history")
  }

  startNewGame(players: Player[]): void {
    const newGame: Game = {
      players: players,
      holes: NEW_HOLES, // Initialize with your game holes
      scores: []
    };
    this.gameSubject.next(newGame);
    console.log("game with" + players);
    console.log("holes: " + newGame.holes);
  }

  

  generateRandomTeams(players: Player[]): Player[][] {
    console.log("generate teams in service");
    // Shuffle the players array to ensure randomness
    const shuffledPlayers = this.shuffleArray(players);

    // Group the shuffled players into pairs (teams of 2)
    const teams = [];
    for (let i = 0; i < shuffledPlayers.length; i += 2) {
        // If at the last iteration, check if there's an odd one out
        if (i === shuffledPlayers.length - 3) {
            // If so, create a team of 3 for the last players
            teams.push(shuffledPlayers.slice(i, i + 3));
            break; // Break the loop as we've now added the last team
        } else {
            // Otherwise, continue forming teams of 2
            teams.push(shuffledPlayers.slice(i, i + 2));
        }
    }
    console.log(teams);
    return teams; // Each element in `teams` is an array representing a team
  }

  generateCrossTeams(players: Player[]): Player[][] {
    console.log("generate cross teams in service");
    // Shuffle the players array to ensure randomness
    const shuffledPlayers = this.shuffleArray(players);

    // Group the shuffled players into pairs (teams of 2)
    const teams = [];
    for (let i = 0; i < shuffledPlayers.length; i += 2) {
        // If at the last iteration, check if there's an odd one out
        if (i === shuffledPlayers.length - 3) {
            // If so, create a team of 3 for the last players
            teams.push(shuffledPlayers.slice(i, i + 3));
            break; // Break the loop as we've now added the last team
        } else {
            // Otherwise, continue forming teams of 2
            teams.push(shuffledPlayers.slice(i, i + 2));
        }
    }
    console.log(teams);
    return teams; // Each element in `teams` is an array representing a team
  }


  private shuffleArray(array: any[]): any[] {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]]; // Swap elements
    }
    return array;
  }
  // Add other methods to manipulate the game data as needed
}
