import { Injectable } from '@angular/core';
import {ApiService} from "./api.service";
import {PokemonData} from "../interfaces/pokemon-data";
import {GetAllPokemonResult} from "../interfaces/getAllPokemonResult";
import {combineLatest, merge, Observable, ReplaySubject, Subject, throwError} from "rxjs";
import {Pokemon} from "../models/pokemon";
import {catchError, debounceTime, map, withLatestFrom} from "rxjs/operators";
import {isNotNullOrUndefined} from "codelyzer/util/isNotNullOrUndefined";
import {GetPokemonDataResult} from "../interfaces/getPokemonDataResult";

@Injectable({
  providedIn: 'root'
})
export class PokedexDataService {
  pokemonResolvedList = new Array<string>();

  currentPokemon = new ReplaySubject<GetPokemonDataResult>(1);
  currentPokemon$ = this.currentPokemon.asObservable();

  currentPokemonSearchSubject = new ReplaySubject<string>(1);

  currentPokemonListSubject = new ReplaySubject<Array<PokemonData>>(1);
  currentPokemonList$ = this.currentPokemonListSubject.asObservable();

  constructor(
    private api: ApiService
  ) {
    this.currentPokemonListSubject.next(undefined);
  }

  findPokemon(name: string) {
    this.currentPokemonList$.subscribe(
      data => {
        if (data === undefined) {
          this.getPokemonData(name).subscribe(
            pokemonData => {
              this.currentPokemon.next(pokemonData);
            }
          )
        } else {
          this.currentPokemon.next(data.find(x => x.name === name).result);
        }
      }
    )
  }

  getAllPokemon() {
    this.api.getAllPokemon().pipe(
      map(
        (data: GetAllPokemonResult) => {
          for (const pokemon of data.results) {
            this.api.getPokemon(pokemon.name).subscribe(
              pokeData => {
                pokemon.result = pokeData;
              }
            );
          }
          return data;
        }
      )
    )
      .subscribe(
      (data: GetAllPokemonResult) => {
        this.currentPokemonListSubject.next(data.results);

      }
    )
  }

  getPokemonData(name: string): Observable<GetPokemonDataResult> {
    return this.api.getPokemon(name);
  }
}
