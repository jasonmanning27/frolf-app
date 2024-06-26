import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Game, Player } from '../game/game.models';
import { NEW_HOLES } from './holes.constant';
import { Round, GameWithRounds } from '../game/game.models';
import { PlayerService } from '../player/player.service';
//import { dummyDataConstant} from './dummyRound.constant';

@Injectable({
  providedIn: 'root'
})

export class GameService {
  private static lastGameId = 0;  // Static property to track last game ID
  private gameSubject = new BehaviorSubject<Game | null>(null);
  game$ = this.gameSubject.asObservable();
  static lastGameID = 0; // Static variable to keep track of the last game ID

  //private gamesHistory: Game[] = []; // Array to store the history of games
  private gamesRoundsHistory: GameWithRounds[] = []; // Array to store the history of games


  constructor(private playerService: PlayerService) {}

  // getGamesHistory(): Game[] {
  //   return this.gamesHistory; // Return a copy if you want to prevent outside modifications
  // }
    
  // submitGame(game: Game) {
  //   this.gamesHistory.push(game); // Store the new game in history
  //   console.log("pushed to game history")
  // }

  // Support method
  submitRound(game: GameWithRounds | null) {
    if(game != null) {

      game.gameID = ++GameService.lastGameId;
      // Set the current date and time
      game.date = new Date().toISOString();

      
      for (let round of game.rounds) {
        round.overall_score = this.calculateOverallScore(round.score_array);
        let players = round.players;
        console.log("Players in round:", players); // Now correctly accessing players
        for(let player of players) {
          console.log(player);
          this.playerService.updateScore(player.id, round.overall_score);
        }
      }
      game.winner = this.getWinner(game);
      this.gamesRoundsHistory.push(game); // Store the new game in history
      console.log("Pushing [", game.rounds.length,"] rounds to history")

    } 
  }
  calculateOverallScore(scores: number[]): number {
    let parScore = 0;
    for (let i = 0; i < scores.length; i++) {
      const score = scores[i];
      if (score !== 0) {  // Ensures that only holes with a recorded score are calculated
        parScore += score - NEW_HOLES[i].par;  // Adjusts the total score compared to the par of the hole
      }
    }
    return parScore;
  }

  getWinner(rounds: GameWithRounds) {
    let max = rounds.rounds[0].overall_score;
    let winner: Player[] = [];
    for(let round of rounds.rounds){
      if(round.overall_score == max) {
        for(let player of round.players) {
          winner[winner.length] = player;
        }
      } else if(round.overall_score < max) {
        max = round.overall_score
        //console.log("replacing winner: ", winner)
        winner = [];
        for(let player of round.players) {
          winner[winner.length] = player;
        }
        //console.log("with: ", winner)
      }
    }
    console.log("Get Winner: " + winner)
    return winner;
  }

  getGamesRoundHistory(): GameWithRounds[] {
    console.log("Getting gamerounds from GameService: ")
    return this.gamesRoundsHistory; // Return a copy if you want to prevent outside modifications
  }

  // Method to intialize new game. DEPRECATED 
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

  
  // Generates completely random teams of size 2. Remainder will go to last team generated when n % 2 = 1.
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

  // Method to generate teams with cross-team pairs when possible.
  // Not implemented
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

  // Shuffle Array to generate teams.
  private shuffleArray(array: any[]): any[] {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]]; // Swap elements
    }
    return array;
  }


  // This initializes a dummy game with rounds data so I can see the frontend changes without creating a new game each time.
  // Currently, this is called everytime the game history page is visted.
  initializeDummyData(): void {
    // const dummy: GameWithRounds = dummyDataConstant;
    // this.gamesRoundsHistory.push(dummyDataConstant);

    const round1: Round = {
      date: "2024-04-16",
      soloGame: false,
      players: [this.playerService.getPlayerByName("Matthew McKnight"),
                this.playerService.getPlayerByName("Eli Fried")
      ],
      overall_score: -8,
      score_array: [3, 3, 3, 3, 7, 3, 5, 3, 3,
                 2, 3, 3, 4, 3, 3, 2, 4, 2, 
                 2, 1
      ],
      holes: NEW_HOLES,
    }
    const round2: Round = {
      date: "2024-04-16",
      soloGame: false,
      players: [this.playerService.getPlayerByName("Rachel Yao"),
                this.playerService.getPlayerByName("Daniel Zhang")
      ],
      score_array: [3, 3, 3, 3, 3, 3, 3, 11, 3,
                 2, 3, 3, 4, 3, 3, 10, 4, 2, 
                 2, 1
      ],
      overall_score: 2,
      holes: NEW_HOLES,
    }
    const round3: Round = {
      date: "2024-04-16",
      soloGame: false,
      players: [this.playerService.getPlayerByName("Abby Stevens"),
                this.playerService.getPlayerByName("Keller Fraley"),
                this.playerService.getPlayerByName("Andrew Fan")
      ],
      overall_score: -10,
      score_array: [3, 3, 3, 3, 3, 6, 3, 3, 3,
                 2, 3, 3, 4, 3, 4, 2, 4, 2, 
                 2, 1
      ],
      holes: NEW_HOLES,
    }
    const round4: Round = {
      date: "2024-04-16",
      soloGame: false,
      players: [this.playerService.getPlayerByName("Jason Manning"),
                this.playerService.getPlayerByName("Seth Fried")
      ],
      overall_score: -9,
      score_array: [2, 3, 3, 3, 0, 4, 3, 3, 3,
                 3, 4, 5, 2, 3, 3, 4, 3, 3, 
                 3, 4
                ],
      holes: NEW_HOLES,
    }
    const round5: Round = {
      date: "2024-04-16",
      soloGame: false,
      players: [this.playerService.getPlayerByName("Min Lim"),
                this.playerService.getPlayerByName("Arjun Deshmukh")
      ],
      overall_score: -2,
      score_array: [3, 3, 3, 8, 3, 3, 10, 3, 3,
                 2, 3, 3, 4, 3, 3, 2, 4, 2, 
                 2, 1
                ],
      holes: NEW_HOLES,
    }
    const round6: Round = {
      date: "2024-04-16",
      soloGame: false,
      players: [this.playerService.getPlayerByName("Jack McCleary"),
                this.playerService.getPlayerByName("Max Goetz")
      ],
      overall_score: -9,
      score_array: [3, 3, 3, 3, 3, 3, 3, 3, 3,
                 2, 3, 3, 4, 3, 3, 2, 4, 2, 
                 3, 5
      ],
      holes: NEW_HOLES,
    }
    const dummyData: GameWithRounds = {
      rounds: [round1, round2, round3, round4, round5, round6],
      gameID: 1,
      date: "April 16",
      winner: []
    }
    //this.gamesRoundsHistory.push(dummyData);
    this.submitRound(dummyData);
  }
}
