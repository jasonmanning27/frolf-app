import { Component, OnInit } from '@angular/core';
import { GameService } from '../game/game.service';
import { Game, GameWithRounds, PlayerScore, Round } from '../game/game.models';
import { par_new_holes } from '../game/holes.constant';

@Component({
  selector: 'app-game-history',
  templateUrl: './game-history.component.html',
  styleUrl: './game-history.component.css'
})
export class GameHistoryComponent implements OnInit {
  public static reset = false;
  //gameHistory: Game[] | undefined;
  gameWithRoundsHistory: GameWithRounds[] = [];
  allRounds: Round[] = [];
  displayedColumns: string[] = ['players', 'soloTeam', 'date', 'roundScore', 'scores'];
  par_new: number = par_new_holes;
  constructor(private gameService: GameService) {}

  ngOnInit(): void {
    // this.gameHistory = this.gameService.getGamesHistory();
    this.gameWithRoundsHistory = this.gameService.getGamesRoundHistory();
    if(!GameHistoryComponent.reset) {
      GameHistoryComponent.reset = true;
      this.gameService.initializeDummyData();
    }
  }

 
  
  public static Route = {
    path: 'game-history',
    component: GameHistoryComponent
  }

  getPlayers(round: Round): string {
    if (!round.players || round.players.length === 0) {
      return 'No players';  // Return a default message or handle as needed
    }

    return round.players.map(player => player.name).join(', ');
  }

  // sumScore(score: number[]): number {
  //   return score.reduce((acc, curr) => acc + curr, 0);
  // }

  soloTeamLabel(soloGame: boolean): string {
    return soloGame ? 'Solo' : 'Team';
  }
  plusOrMinus(score: number): string {
    if(score == 0) {
      return '' + score;
    } else if (score > 0) {
      return '+' + score;
    } else {
      return '' + score;
    }
  }
  winnerString(game: GameWithRounds): string {
    let winnerString = '';
    for(let player of game.winner) {
      winnerString += player.name + ', ';
    }
    return winnerString;
  }
}
