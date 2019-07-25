import {GetPokemonDataResult} from "./getPokemonDataResult";

export interface PokemonData {
  name: string;
  url: string;
  resolved: GetPokemonDataResult;
}
