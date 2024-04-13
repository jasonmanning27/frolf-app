import { Component, OnInit } from '@angular/core';
import { Player, Hole, PlayerScore, Game } from '../game/game.models';
import { GameService } from './game.service';
import { OLD_HOLES, NEW_HOLES } from './holes.constant';
import { ChangeDetectorRef } from '@angular/core';


@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css']
})

export class GameComponent implements OnInit {
  game: Game | null = null;
  teams: Player[][] = []; // To store the generated teams
  teamScores: number[][] = []; // Scores for each team and hole

  displayedColumns: string[] = [];


  constructor(private cdr: ChangeDetectorRef, private gameService: GameService) { }

  ngOnInit() {
    this.gameService.game$.subscribe(game => {
      this.game = game;
    });
    this.initializeScores();
    if(this.game != null ) {
      this.displayedColumns = ['team', ...this.game.holes.map(h => h.name)];
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
    console.log("generate teams");
    if(this.game != null) {
      this.teams = this.gameService.generateRandomTeams(this.game.players);
    }
    // this.cdr.detectChanges(); // Manually trigger change detection
    console.log("# of teams debug: " + this.teams.length);
    this.initializeScores();
    // Now `teams` holds the generated teams, and you can display them in your template if needed
  }

  initializeScores(): void {
    // Check if `this.game` and `this.game.holes` are not null, otherwise use a fallback value
    const numberOfHoles = this.game?.holes?.length ?? 0;
  
    // Use the verified number of holes to initialize scores
    this.teamScores = this.teams.map(() => 
      new Array(numberOfHoles).fill(0)); // Initialize all scores to 0

    console.log(this.teamScores);
  }

  incrementScore(teamIndex: number, holeIndex: number): void {
    this.teamScores[teamIndex][holeIndex]++;
  }

  decrementScore(teamIndex: number, holeIndex: number): void {
    this.teamScores[teamIndex][holeIndex] = Math.max(0, this.teamScores[teamIndex][holeIndex] - 1); // Prevent scores from going negative
  }
  // Submit Score Method

  submitScorecard(game: Game) {
    console.log("TeamScores: ",  this.teamScores);
    this.gameService.submitGame(game);
  }
}