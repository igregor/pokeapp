import pokedata from "./data/pokemon.json";
import { isNameIncludingText, isNameMatchingText } from "./utils";

export type Pokemon = typeof pokedata[number];

/**
 * To initialize: const Pokedex = new PokedexClient()
 *
 * const pokemon = PokedexClient.listPokemon()
 * const charizard = PokedexClient.getPokemonByName('charizard')
 */
export class PokedexClient {
  private pokedex: Map<string, Pokemon> = new Map();

  constructor() {
    pokedata.forEach((pokemon) =>
      this.pokedex.set(pokemon.name.english, pokemon)
    );
  }

  /**
   * Returns a list of pokemon filtered name
   */
  private queryByName(name: string): Pokemon[] {
    const results: Pokemon[] = [];

    this.pokedex.forEach((pokemon) => {
      if (isNameIncludingText(pokemon.name.english, name)) {
        results.push(pokemon);
      }
    });

    return results;
  }

  /**
   * Returns a list of pokemon filtered type
   */
  private queryByType(type: string): Pokemon[] {
    const results: Pokemon[] = [];

    this.pokedex.forEach((pokemon) => {
      if (pokemon.type.includes(type)) {
        results.push(pokemon);
      }
    });

    return results;
  }

  /**
   * Returns a list of pokemon filtered by name and type
   */
  private queryByNameAndType(name: string, type: string): Pokemon[] {
    const results: Pokemon[] = [];

    this.pokedex.forEach((pokemon) => {
      if (
        isNameIncludingText(pokemon.name.english, name) &&
        pokemon.type.includes(type)
      ) {
        results.push(pokemon);
      }
    });

    return results;
  }

  /**
   * Returns a list of pokemon filtered by name and or type
   */
  listPokemon({ name, type }: { name?: string; type?: string }): Pokemon[] {
    if (!name && !type) {
      return [];
    } else if (name && type) {
      return this.queryByNameAndType(name, type);
    } else if (name) {
      return this.queryByName(name);
    } else if (type) {
      return this.queryByType(type);
    } else {
      return [];
    }
  }

  /**
   * Returns a single pokemon selected by exact name match
   */
  getPokemonByName(name: string): Pokemon | null {
    let result: Pokemon | null = null;

    this.pokedex.forEach((pokemon) => {
      if (isNameMatchingText(pokemon.name.english, name)) {
        result = pokemon;
      }
    });

    return result;
  }
}
