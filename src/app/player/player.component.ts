import { Component, OnInit } from '@angular/core';
import { Player } from './player.model'; // Adjust the path as necessary
import { PlayerService } from './player.service'; // Adjust the path as necessary

@Component({
  selector: 'app-players',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.css']
})
export class PlayersComponent implements OnInit {
  players: Player[] = [];

  constructor(private playerService: PlayerService) { }

  ngOnInit(): void {
    this.players = this.playerService.getPlayers();
  }
}