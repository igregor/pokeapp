import PokemonSearchPage from "./PokemonSearchPage";
import { render, screen } from "./../../test-utils/render";

const renderPokemonSearchPage = () => {
  render(<PokemonSearchPage />);

  const pageObject = {
    assert: {
      introductionMessage: {
        isRendered: () => screen.getByText("Let's find a pokemon"),
      },

      searchBar: {
        isRendered: () => screen.getByPlaceholderText("filter by name"),
      },
    },
  };

  return pageObject;
};

describe("SinglePokemonPage", () => {
  it("renders introduction message before the user types anything", () => {
    const utils = renderPokemonSearchPage();

    utils.assert.introductionMessage.isRendered();
  });

  it("renders search bar", () => {
    const utils = renderPokemonSearchPage();

    utils.assert.searchBar.isRendered();
  });

  describe("search", () => {
    it.todo("allows to search pokemons by name");

    it.todo("allows to filter the results by type");

    it.todo("allows to clear the search results");
  });

  describe("show more button", () => {
    // TODO @g.wojtanowicz - this should be done as an optimization for the long lists
    // but maybe it's outside of the scope of this task
    it.todo("is rendered when there are more than XX results");
    it.todo("shows more results after click");
  });

  it.todo("opens the details dialog when the user clicks the list item");

  it.todo("closes the details dialog when the user clicks 'X'");
});
