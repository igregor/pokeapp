import { PokedexClient } from "./pokedex";

// NOTE @g.wojtanowicz Let's export it to be consumed as a singleton
const pokedexClient = new PokedexClient();

export { pokedexClient };
export { pokemonFixture } from "./pokemon.fixture";
export type { Pokemon } from "./pokedex";
