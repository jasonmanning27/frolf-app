import { Component } from '@angular/core';
import { PlayerService } from '../player/player.service';
import { Player } from '../player/player.model';
import { PlayersComponent } from '../player/player.component';
import { MatSort, Sort, MatSortModule } from '@angular/material/sort';
import { ViewChild } from '@angular/core';
import { MatTableModule } from '@angular/material/table';

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
  players: Player[] = [];
  sortedPlayers: Player[];
  displayedColumns: string[] = ['name', 'score', 'rating', 'rank'];


  constructor(private playerService: PlayerService) {
    this.players = this.playerService.getPlayers();
    this.sortedPlayers = this.players.slice();
  }


  ngOnInit(): void {
    this.players = this.playerService.getPlayers();
  }

  sortData(sort: Sort) {
    console.log(sort);
    const data = this.players.slice();
    if (!sort.active || sort.direction === '') {
      this.sortedPlayers = data;
      return;
    }
    this.sortedPlayers= data.sort((a, b) => {
      const isAsc = sort.direction === 'asc';
      switch (sort.active) {
        case 'name':
          return compare(a.name, b.name, isAsc);
        case 'score':
          return compare(a.score, b.score, isAsc);
        case 'rating':
          return compare(a.rating, b.rating, isAsc);
        case 'rank':
          return compare(a.rank, b.rank, isAsc);
        default:
          return 0;
      }
    });
  }
}
function compare(a: number | string, b: number | string, isAsc: boolean) {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}