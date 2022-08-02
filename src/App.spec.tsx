import App from "./App";

import { renderWithRouter, screen } from "./test-utils/render";

describe("App routing", () => {
  it("renders PokemonSearchPage as a root page", () => {
    renderWithRouter(<App />);

    const title = screen.getByText(/Pokedex/i);
    expect(title).toBeInTheDocument();
  });

  it("falls back to PokemonSearchPage if the url is not matching any know pattern", () => {
    renderWithRouter(<App />, { route: "/highway-to-hell" });

    const title = screen.getByText(/Pokedex/i);
    expect(title).toBeInTheDocument();
  });
});
