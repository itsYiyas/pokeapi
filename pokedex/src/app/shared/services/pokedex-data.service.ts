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
  currentPokemonSubject = new ReplaySubject<GetPokemonDataResult>(1);
  currentPokemon$ = this.currentPokemonSubject.asObservable();

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
        if (data) {
          const foundPokemon = data.find(x => x.name === name).result;
          if (foundPokemon) {
            this.currentPokemonSubject.next(foundPokemon);
            return;
          }
        }
        this.getPokemonData(name).subscribe(
          pokemonData => {
            this.currentPokemonSubject.next(pokemonData);
          }
        )
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
