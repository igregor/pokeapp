import { pokemonFixture } from "../../services/pokedex";
import { getUniqueTypes } from "./utils";

describe("listPokemonTypes", () => {
  it("returns all unique types", () => {
    const list = [
      pokemonFixture({
        id: 1,
        type: ["Grass", "Poison"],
      }),
      pokemonFixture({
        id: 2,
        type: ["Grass", "Poison", "Fire"],
      }),
    ];

    const types = getUniqueTypes(list);

    expect(types).toMatchInlineSnapshot(`
Array [
  "Grass",
  "Poison",
  "Fire",
]
`);
  });
});
