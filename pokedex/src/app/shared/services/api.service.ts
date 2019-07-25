import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {GetAllPokemonResult} from "../interfaces/getAllPokemonResult";
import {GetPokemonDataResult} from "../interfaces/getPokemonDataResult";

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

  getPokemon(name: string): Observable<GetPokemonDataResult> {
    return this.http.get<GetPokemonDataResult>(`https://pokeapi.co/api/v2/pokemon/${name}`);
  }
}
