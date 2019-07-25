import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {PokedexDataService} from "../../../shared/services/pokedex-data.service";

@Component({
  selector: 'app-pokemon-view',
  templateUrl: './pokemon-view.component.html',
  styleUrls: ['./pokemon-view.component.scss']
})
export class PokemonViewComponent implements OnInit {
  currentPokemon$ = this.pokedexDataService.currentPokemon$;

  constructor(
    private aRoute: ActivatedRoute,
    private pokedexDataService: PokedexDataService
  ) { }

  ngOnInit() {
    this.aRoute.params.subscribe(
      params => {
        console.log(params.id);
        this.pokedexDataService.findPokemon(params.id);
      }
    )
  }

}
