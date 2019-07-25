import { Injectable } from '@angular/core';
import {Observable, Subscription} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {PokemonData} from "../interfaces/pokemon-data";
import {GetAllPokemonResult} from "../interfaces/getAllPokemonResult";

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(
    private http: HttpClient
  ) { }

  getAllPokemon(): Observable<GetAllPokemonResult> {
    return this.http.get<GetAllPokemonResult>('https://pokeapi.co/api/v2/pokemon/?limit=151');
  }

  getPokemon(name: string): Observable<any> {
    return this.http.get(`https://pokeapi.co/api/v2/pokemon/${name}`);
  }
}
