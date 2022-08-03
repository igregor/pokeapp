import { renderPokemonSearchPage } from "./PokemonSearchPage.test-utils";

jest.mock("../../services/pokedex/data/pokemon.json");

describe("SinglePokemonPage", () => {
  it("renders introduction message and searchBar before the user types anything", async () => {
    const utils = renderPokemonSearchPage();

    await utils.assert.introductionMessage.isRendered();
    utils.assert.searchBar.isRendered();
  });

  describe("searchBar", () => {
    it("allows to search pokemon by name", async () => {
      const utils = renderPokemonSearchPage();

      await utils.act.searchBar.typeInNameInput("saur");

      await utils.assert.introductionMessage.isNotRendered();
      await utils.assert.pokemonList.hasItems(["Bulbasaur", "Ivysaur"]);
    });

    it("allows to filter the results by type", async () => {
      const utils = renderPokemonSearchPage();

      await utils.act.searchBar.typeInNameInput("saur");

      await utils.assert.pokemonList.hasItems(["Bulbasaur", "Ivysaur"]);

      await utils.act.searchBar.selectType("Poison");

      await utils.assert.pokemonList.hasItems(["Ivysaur"]);
    });

    it("allows to clear the search results", async () => {
      const utils = renderPokemonSearchPage();

      await utils.act.searchBar.typeInNameInput("saur");

      await utils.assert.pokemonList.hasItems(["Bulbasaur", "Ivysaur"]);

      await utils.act.searchBar.typeInNameInput("");

      await utils.assert.introductionMessage.isRendered();
      utils.assert.pokemonList.isNotRendered();
    });
  });

  describe("show more button or lazy loading", () => {
    // TODO @g.wojtanowicz - this should be done as an optimization for the long lists
    // but it's not in the scope of this task
  });

  it("opens the details dialog when the user clicks the list item and closes by clicking 'Close' button", async () => {
    const utils = renderPokemonSearchPage();

    await utils.act.searchBar.typeInNameInput("saur");

    await utils.assert.pokemonList.hasItems(["Bulbasaur", "Ivysaur"]);

    await utils.act.pokemonList.clickListItem("Bulbasaur");

    utils.assert.detailsDialog.isRenderedForSpecificPokemon("Bulbasaur");

    await utils.act.detailsDialog.close();

    utils.assert.detailsDialog.isNotRendered();

    await utils.assert.pokemonList.hasItems(["Bulbasaur", "Ivysaur"]);
  });
});
