import { PokedexClient } from "./pokedex";

jest.mock("./data/pokemon.json");

describe("getPokemonByName()", () => {
  it("returns null when the name does not belong to any pokemon in the data", () => {
    const Pokedex = new PokedexClient();

    const gregorozard = Pokedex.getPokemonByName("gregorozard");

    expect(gregorozard).toBeNull();
  });

  it("returns a pokemon when the name is found in the data", () => {
    const Pokedex = new PokedexClient();

    const charizard = Pokedex.getPokemonByName("charizard");

    expect(charizard).toMatchInlineSnapshot(`
Object {
  "base": Object {
    "Attack": 84,
    "Defense": 78,
    "HP": 78,
    "Sp. Attack": 109,
    "Sp. Defense": 85,
    "Speed": 100,
  },
  "description": "Charizard flies around the sky in search of powerful opponents. It breathes fire of such great heat that it melts anything. However, it never turns its fiery breath on any opponent weaker than itself.",
  "evolution": Object {
    "prev": Array [
      "5",
      "Level 36",
    ],
  },
  "id": 6,
  "image": Object {
    "hires": "https://raw.githubusercontent.com/Purukitto/pokemon-data.json/master/images/pokedex/hires/006.png",
    "sprite": "https://raw.githubusercontent.com/Purukitto/pokemon-data.json/master/images/pokedex/sprites/006.png",
    "thumbnail": "https://raw.githubusercontent.com/Purukitto/pokemon-data.json/master/images/pokedex/thumbnails/006.png",
  },
  "name": Object {
    "chinese": "喷火龙",
    "english": "Charizard",
    "french": "Dracaufeu",
    "japanese": "リザードン",
  },
  "profile": Object {
    "ability": Array [
      Array [
        "Blaze",
        "false",
      ],
      Array [
        "Solar Power",
        "true",
      ],
    ],
    "egg": Array [
      "Monster",
      "Dragon",
    ],
    "gender": "87.5:12.5",
    "height": "1.7 m",
    "weight": "90.5 kg",
  },
  "species": "Flame Pokémon",
  "type": Array [
    "Fire",
    "Flying",
  ],
}
`);
  });
});

describe("listPokemon()", () => {
  it("returns an empty array when there are no pokemon matched by name", () => {
    const Pokedex = new PokedexClient();

    const results = Pokedex.listPokemon({ name: "gregorozaur" });

    expect(results).toHaveLength(0);
  });

  it("returns an empty array when there are no pokemon matched by type", () => {
    const Pokedex = new PokedexClient();

    const results = Pokedex.listPokemon({ type: "Ground" });

    expect(results).toHaveLength(0);
  });

  it("returns an empty array when there are no pokemon matching name and type", () => {
    const Pokedex = new PokedexClient();

    const results = Pokedex.listPokemon({ name: "charizard", type: "Ground" });

    expect(results).toHaveLength(0);
  });

  it("returns an array of pokemons matched by name and type", () => {
    const Pokedex = new PokedexClient();

    const results = Pokedex.listPokemon({ name: "chariz", type: "Fire" });

    expect(results).toHaveLength(1);
    expect(results[0].name.english).toBe("Charizard");
  });

  it("returns an array of pokemons matched by name", () => {
    const Pokedex = new PokedexClient();

    const results = Pokedex.listPokemon({ name: "saur" });

    expect(results).toHaveLength(2);
    expect(results[0].name.english).toBe("Bulbasaur");
    expect(results[1].name.english).toBe("Ivysaur");
  });

  it("returns an array of pokemons matched by type", () => {
    const Pokedex = new PokedexClient();

    const results = Pokedex.listPokemon({ type: "Grass" });

    expect(results).toHaveLength(2);
    expect(results[0].name.english).toBe("Bulbasaur");
    expect(results[1].name.english).toBe("Ivysaur");
  });
});
