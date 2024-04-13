import { Component, OnInit } from '@angular/core';
import { GameService } from '../game/game.service';
import { Game, PlayerScore } from '../game/game.models';

@Component({
  selector: 'app-game-history',
  templateUrl: './game-history.component.html',
  styleUrl: './game-history.component.css'
})
export class GameHistoryComponent implements OnInit {

  gameHistory: Game[] | undefined;
  constructor(private gameService: GameService) {
   
  }
  ngOnInit(): void {
    this.gameHistory = this.gameService.getGamesHistory();
  }
  public static Route = {
    path: 'game-history',
    component: GameHistoryComponent
  }
  getScore(scores: PlayerScore[], playerId: number, holeNumber: number): number | undefined {
    const score = scores.find(s => s.playerId === playerId && s.holeNumber === holeNumber);
    return score ? score.score : undefined;
  }

}
