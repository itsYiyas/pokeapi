import {GetPokemonDataResult} from "./getPokemonDataResult";

export interface PokemonData {
  name: string;
  url: string;
  result: GetPokemonDataResult;
}
