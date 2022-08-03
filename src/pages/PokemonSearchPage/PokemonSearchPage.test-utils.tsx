import PokemonSearchPage from "./PokemonSearchPage";
import { render, screen, fireEvent, within } from "./../../test-utils/render";

export function renderPokemonSearchPage() {
  const { user } = render(<PokemonSearchPage />);

  const pageObject = {
    act: {
      searchBar: {
        typeInNameInput: async (text: string) => {
          const input = screen.getByPlaceholderText("Filter by name");

          if (text) {
            await user.type(input, text);
          } else {
            await user.clear(input);
          }
        },

        selectType: async (optionToSelect: string) => {
          const selectElement = screen.getByText("Select type");

          // NOTE @g.wojtanowicz This magic is here because of the mui <Select /> usage
          // and this is the same way mui tests its components :) https://github.com/mui/material-ui/blob/master/packages/mui-material/src/Select/Select.test.js#L239
          fireEvent.mouseDown(selectElement);

          const elementToSelect = await screen.findByText(optionToSelect);

          await user.click(elementToSelect);
        },
      },

      pokemonList: {
        clickListItem: async (name: string) => {
          const elementToClick = within(
            screen.getByTestId("pokemon-list")
          ).getByText(name);

          await user.click(elementToClick);
        },
      },

      detailsDialog: {
        close: async () => {
          const closeButton = screen.getByText("Close");

          await user.click(closeButton);
        },
      },
    },

    assert: {
      introductionMessage: {
        isRendered: () => {
          expect(screen.getByText("Let's find a pokemon")).toBeInTheDocument();
        },

        isNotRendered: () => {
          expect(screen.queryByText("Let's find a pokemon")).toBeNull();
        },
      },

      searchBar: {
        isRendered: () => {
          expect(
            screen.getByPlaceholderText("Filter by name")
          ).toBeInTheDocument();
        },
      },

      pokemonList: {
        isNotRendered: () => {
          expect(screen.queryByTestId("pokemon-list")).toBeNull();
        },

        hasItems: (pokemonNames: string[]) => {
          expect(screen.getAllByTestId("pokemon-list-item")).toHaveLength(
            pokemonNames.length
          );

          pokemonNames.forEach((name) => {
            expect(screen.getByText(name)).toBeInTheDocument();
          });
        },
      },

      detailsDialog: {
        isRenderedForSpecificPokemon: (pokemonName: string) => {
          const dialogWrapper = screen.getByTestId("details-dialog");

          expect(dialogWrapper).toBeInTheDocument();
          expect(
            within(dialogWrapper).getByText(pokemonName)
          ).toBeInTheDocument();
        },

        isNotRendered: () => {
          expect(screen.queryByTestId("details-dialog")).toBeNull();
        },
      },
    },
  };

  return pageObject;
}
