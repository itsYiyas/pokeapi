import { Component, OnInit } from '@angular/core';
import {PokedexDataService} from "../../../shared/services/pokedex-data.service";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  currentPokemonList$ = this.pokedexdataService.currentPokemonList$;

  constructor(
    private pokedexdataService: PokedexDataService
  ) { }

  ngOnInit() {


    this.pokedexdataService.getAllPokemon();
  }

}
