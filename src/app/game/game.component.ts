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

    // Generate teams in GameSErvice.
    console.log("Generating teams...");
    if(this.game != null) {
      this.teams = this.gameService.generateRandomTeams(this.game.players);
    }
  
    // Now `teams` holds the generated teams, and you can display them in your template if needed
    let rounds: Round[] = [];

    // Iterate over each team to create a round 
    for (const team of this.teams) {

      //let roundPlayers = team; // This team's players are the round's players
  
      let round: Round = {
        date: "test",
        players: team,
        holes: NEW_HOLES,
        numScore: new Array(this.gameHoles.length).fill(0),
        scores: new Array(this.game?.holes.length).fill(0),
        soloGame: false // Assuming non-solo because they are teams
      };

      rounds.push(round); // Add this round to the rounds array
      // console.log("Number of holes: ", round.holes.length)
      // console.log("team: ", round.players);
    }
    console.log("Rounds: ", rounds);
   
    // Initialize a GameWithRounds object with the rounds array
    let gameWithRounds: GameWithRounds = {
      rounds: rounds
    };

    this.gameWithRounds = gameWithRounds;
    this.gamesRounds = rounds;

    this.initializeScores(); // Initialize or update scores if needed
    // // Store the gameWithRounds somewhere or return it as needed
    // console.log("Rounds generated:", gameWithRounds.rounds.length);
    
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

}