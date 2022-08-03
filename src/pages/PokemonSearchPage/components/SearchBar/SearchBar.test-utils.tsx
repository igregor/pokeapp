import SearchBar from "./SearchBar";
import {
  render,
  screen,
  fireEvent,
  within,
  waitFor,
} from "./../../../../test-utils/render";

export function renderSearchBar(availableTypes: string[] = []) {
  const onNameQueryChangeMock = jest.fn();
  const onTypeSelectMock = jest.fn();

  const { user } = render(
    <SearchBar
      availableTypes={availableTypes}
      onNameQueryChange={onNameQueryChangeMock}
      onTypeSelect={onTypeSelectMock}
    />
  );

  const pageObject = {
    act: {
      typeInNameInput: async (text: string) => {
        const input = screen.getByPlaceholderText("Filter by name");

        if (text) {
          await user.type(input, text);
        } else {
          await user.clear(input);
        }
      },

      openTypeSelect: () => {
        const selectElement = screen.getByText("Select type");

        fireEvent.mouseDown(selectElement);
      },

      selectType: async (optionToSelect: string) => {
        const selectElement = screen.getByText("Select type");

        fireEvent.mouseDown(selectElement);

        const elementToSelect = await screen.findByText(optionToSelect);

        await user.click(elementToSelect);
      },
    },

    assert: {
      typeSelect: {
        isDisabled: () => {
          const selectElement = screen.getByTestId("type-select");
          // NOTE @g.wojtanowicz This is a mui thing, read more: https://stackoverflow.com/questions/64553059/how-to-check-if-a-material-ui-menuitem-is-disabled-using-react-testing-library
          const selectButton = within(selectElement).getByRole("button");

          expect(selectButton).toHaveAttribute("aria-disabled");
        },
      },

      onNameQueryChange: {
        wasCalledWith: async (calledWith: string) => {
          await waitFor(() => {
            expect(onNameQueryChangeMock).toBeCalledWith(calledWith);
          });

          expect(onNameQueryChangeMock).toBeCalledTimes(1);
        },
      },

      onTypeSelect: {
        wasCalledWith: async (calledWith: string) => {
          await waitFor(() => {
            expect(onTypeSelectMock).toBeCalledWith(calledWith);
          });

          expect(onTypeSelectMock).toBeCalledTimes(1);
        },
      },
    },
  };

  return pageObject;
}
