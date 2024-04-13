import { Component } from '@angular/core';
import { PlayerService } from '../player/player.service';
import { Player } from '../player/player.model';
import { PlayersComponent } from '../player/player.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  public static Route = {
    path: '',
    component: HomeComponent
  }
  constructor(private playerService: PlayerService) {}

  players: Player[] = [];
  displayedColumns: string[] = ['name', 'score', 'rating', 'rank'];

  ngOnInit(): void {
    this.players = this.playerService.getPlayers();
  }
}
