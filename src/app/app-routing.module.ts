import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { NewGameComponent } from './new-game/new-game.component';
import { GameHistoryComponent } from './game-history/game-history.component';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';


const routes: Routes = [
  HomeComponent.Route,
  NewGameComponent.Route,
  GameHistoryComponent.Route,
];

const routes2: Routes = [
  { path: '', component: HomeComponent },
  { path: 'new-game', component: NewGameComponent },
  { path: 'game-history', component: GameHistoryComponent }
]
@NgModule({
  imports: [RouterModule.forRoot(routes2, { useHash: true })],
  exports: [RouterModule],
  //providers: [{provide: LocationStrategy, useClass: HashLocationStrategy}]

})
export class AppRoutingModule { }
