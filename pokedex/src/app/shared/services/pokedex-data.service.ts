import { Injectable } from '@angular/core';
import {ApiService} from "./api.service";
import {PokemonData} from "../interfaces/pokemon-data";
import {GetAllPokemonResult} from "../interfaces/getAllPokemonResult";
import {combineLatest, ReplaySubject} from "rxjs";
import {Pokemon} from "../models/pokemon";
import {map} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class PokedexDataService {
  pokemonResolvedList = new Array<string>();

  currentPokemonSearchSubject = new ReplaySubject<string>(1);

  currentPokemonSubject = new ReplaySubject<Array<PokemonData>>(1);
  currentPokemonList$ = this.currentPokemonSubject.asObservable();

  currentPokemon$ = combineLatest(
    this.currentPokemonSearchSubject.asObservable(),
    this.currentPokemonList$
  ).pipe(
    map(
      (data: [
        string,
        Array<PokemonData>
        ]) => {
        const searchTerm = data[0];
        const pokemonList = data[1];
        const results = pokemonList.filter(x => x.name === searchTerm);
        return pokemonList.filter(x => x.name === searchTerm)[0];
      }
    )
  );

  constructor(
    private api: ApiService
  ) { }

  findPokemon(name: string) {
    this.currentPokemonSearchSubject.next(name);
  }

  getAllPokemon() {
    this.api.getAllPokemon().pipe(
      map(
        (data: GetAllPokemonResult) => {
          console.log(data);
          for (const pokemon of data.results) {
            this.api.getPokemon(pokemon.name).subscribe(
              pokeData => {
                pokemon.result = pokeData;
                this.pokemonResolvedList.push(pokemon.name);
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
