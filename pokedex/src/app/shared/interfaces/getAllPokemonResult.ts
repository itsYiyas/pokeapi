import {PokemonData} from "./pokemon-data";

export interface GetAllPokemonResult {
  count: number;
  next: number;
  previous: number;
  results: Array<PokemonData>
}
