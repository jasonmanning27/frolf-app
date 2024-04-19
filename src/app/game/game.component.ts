import { Component, OnInit } from '@angular/core';
import { Player, Hole, PlayerScore, Game, Round, GameWithRounds} from '../game/game.models';
import { GameService } from './game.service';
import { OLD_HOLES, NEW_HOLES } from './holes.constant';
import { ChangeDetectorRef } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css']
})

export class GameComponent implements OnInit {
  game: Game | null = null;
  // New Setup of game as a collection of rounds
  gameWithRounds: GameWithRounds | null = null;
  gamesRounds: Round[] = [];
  // this is hopefully temporary variable. 
  gameHoles: Hole[] = [];

  teams: Player[][] = []; // To store the generated teams
  teamScores: number[][] = []; // Scores for each team and hole

  displayedColumns: string[] = ['teams', ...this.gameHoles.map(hole => hole.name)];


  constructor(private cdr: ChangeDetectorRef, private gameService: GameService, private dialog: MatDialog) { }

  ngOnInit() {
    this.gameService.game$.subscribe(game => {
      this.game = game;
    });
    this.initializeScores();

    if(this.game != null ) {
      this.displayedColumns = ['team', ...this.game.holes.map(h => h.name)];
      //this.displayedColumns = ['teams', ...this.gameHoles.map(hole => hole.name)];
      
    }
    // Initialize NEW_HOLES as default for now. 
    this.gameHoles = NEW_HOLES;
  }

  // onSubmit Method
  submitRoundsScorecard(gameWithRounds: GameWithRounds | null) {
    console.log("Submitting GameWithRounds: ");
    if(gameWithRounds != null) {
      this.gameService.submitRound(gameWithRounds);
    }
  }

  // Team Generating Methods
  onSoloTeams(): void {
    // Assuming `this.game.players` is your original array of players
    if(this.game != null) {
      this.teams = this.game.players.map(player => [player]);
    }
    this.initializeScores();
  }

  onGenerateTeams(): void {
    console.log("Generating teams...");
    if (this.game != null) {
      this.teams = this.gameService.generateRandomTeams(this.game.players);
    }

    let rounds: Round[] = [];
    for (const team of this.teams) {
      let round: Round = {
        date: new Date().toISOString().slice(0, 10), // Sets the date to the current date in YYYY-MM-DD format
        players: team,
        holes: NEW_HOLES,
        score_array: new Array(this.gameHoles.length).fill(0),
        overall_score: 0,
        soloGame: false
      };

      rounds.push(round);
    }
    console.log("Rounds: ", rounds);

    let gameWithRounds: GameWithRounds = {
      rounds: rounds,
      winner: [], // Initialize with an empty array, implying no winners initially
      gameID: ++GameService.lastGameID, // Increment and assign a new game ID
      date: new Date().toISOString().slice(0, 10) // Set the game creation date
    };

    this.gameWithRounds = gameWithRounds;
    this.gamesRounds = rounds;

    this.initializeScores(); // Initialize or update scores if needed
  }

  initializeScores(): void {
    // Check if `this.game` and `this.game.holes` are not null, otherwise use a fallback value
    const numberOfHoles = this.game?.holes?.length ?? 0;
  
    // Use the verified number of holes to initialize scores
    this.teamScores = this.teams.map(() => 
      new Array(numberOfHoles).fill(0)); // Initialize all scores to 0

    console.log("scores: ", this.teamScores);
  }

  incrementScore(teamIndex: number, holeIndex: number): void {
    this.teamScores[teamIndex][holeIndex]++;
  }

  decrementScore(teamIndex: number, holeIndex: number): void {
    this.teamScores[teamIndex][holeIndex] = Math.max(0, this.teamScores[teamIndex][holeIndex] - 1); // Prevent scores from going negative
  }

  trackHole(index: number, hole: Hole): number {
    return hole.number; // Assuming each hole has a unique number
  }

  trackRound(index: number, round: Round): number {
    return index; // Here, you might use a unique identifier if available
  }

  trackPlayer(index: number, player: Player): number {
    return player.id; // Assuming each player has a unique ID
  }

  trackScore(index: number, score: number): number {
    return index; // Unique track by index of the score in the array
  }

  calculateOverallScore(scores: number[]): number {
    return this.gameService.calculateOverallScore(scores);
  }
}