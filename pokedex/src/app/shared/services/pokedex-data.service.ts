import { Injectable } from '@angular/core';
import {ApiService} from "./api.service";
import {PokemonData} from "../interfaces/pokemon-data";
import {GetAllPokemonResult} from "../interfaces/getAllPokemonResult";
import {ReplaySubject} from "rxjs";
import {Pokemon} from "../models/pokemon";
import {map} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class PokedexDataService {

  currentPokemonSubject = new ReplaySubject<Array<PokemonData>>(1);
  currentPokemonList$ = this.currentPokemonSubject.asObservable();

  constructor(
    private api: ApiService
  ) { }

  getAllPokemon() {
    this.api.getAllPokemon().pipe(
      map(
        (data: GetAllPokemonResult) => {
          console.log(data);
          for (const pokemon of data.results) {
            this.api.getPokemon(pokemon.name).subscribe(
              pokeData => {
                pokemon.resolved = pokeData;
              }
            );
          }

          return data;
        }
      )
    )
      .subscribe(
      (data: GetAllPokemonResult) => {
        console.log(data);
        this.currentPokemonSubject.next(data.results);

      }
    )
  }

  getPokemonData(name: string) {
    this.api.getPokemon(name).subscribe(
      data => {
        console.log(data);
      }
    );
  }
}
