import { Injectable } from '@angular/core';
import {ApiService} from "./api.service";
import {PokemonData} from "../interfaces/pokemon-data";
import {GetAllPokemonResult} from "../interfaces/getAllPokemonResult";
import {ReplaySubject} from "rxjs";
import {Pokemon} from "../models/pokemon";

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
    this.api.getAllPokemon().subscribe(
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
