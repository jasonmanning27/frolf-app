import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { NewGameComponent } from './new-game/new-game.component';
import { GameHistoryComponent } from './game-history/game-history.component';

const routes: Routes = [
  HomeComponent.Route,
  NewGameComponent.Route,
  GameHistoryComponent.Route,
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
