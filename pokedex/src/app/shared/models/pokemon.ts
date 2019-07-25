import {PokemonData} from "../interfaces/pokemon-data";

export class Pokemon {
  name: string;
  url: string;

  constructor() {

  }

  parse_data(data: PokemonData) {
    this.name = data.name;
    this.url = data.url;
  }
}
