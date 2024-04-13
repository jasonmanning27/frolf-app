import { Component } from '@angular/core';
import { OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, FormControl } from '@angular/forms';
import { PlayerService } from '../player/player.service';
import { Player } from '../player/player.model';
import { PlayersComponent } from '../player/player.component';
import { GameComponent } from '../game/game.component';
import { GameService } from '../game/game.service';

@Component({
  selector: 'app-new-game',
  templateUrl: './new-game.component.html',
  styleUrl: './new-game.component.css'
})
export class NewGameComponent implements OnInit {
  public static Route = {
    path: 'new-game',
    component: NewGameComponent
  }

  gameStarted = false;
  form!: FormGroup;
  players: Player[] = [];
  playersPlaying: Player[] = []; // Players selected to play the game

  constructor(private fb: FormBuilder, 
              private playerService: PlayerService,
              private gameService: GameService
              ) { }

  ngOnInit(): void {
    this.players = this.playerService.getPlayers();
    this.initForm();
  }

  initForm() {
    const formControls = this.players.map(() => new FormControl(false));
    this.form = this.fb.group({
      playersCheckboxes: new FormArray(formControls)
    });
  }

  onSubmit() {
    const selectedPlayersIndices = this.form.value.playersCheckboxes
      .map((checked: boolean, index: number) => checked ? index : null)
      .filter((value: number | null) => value !== null)
      .map((index: number) => this.players[index]);
    this.playersPlaying = selectedPlayersIndices;
    console.log(this.playersPlaying); // For debugging
    this.gameStarted = true;
    this.gameService.startNewGame(this.playersPlaying);
  }

  get playersFormArray() {
    return this.form.controls['playersCheckboxes'] as FormArray;
  }
}



