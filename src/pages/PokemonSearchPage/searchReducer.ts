type Actions =
  | { type: "changeNameQuery"; query: string }
  | { type: "clear" }
  | { type: "setAvailableTypes"; availableTypes: string[] }
  | {
      type: "changePokemonType";
      pokemonType: string;
    };

export type SearchState = {
  nameQuery: string;
  type: string;
  availableTypes: string[];
};

export const searchInitialState: SearchState = {
  nameQuery: "",
  type: "",
  availableTypes: [],
};

export const searchReducer = (
  state: SearchState,
  action: Actions
): SearchState => {
  switch (action.type) {
    case "changeNameQuery":
      return {
        ...state,
        nameQuery: action.query,
        type: "",
      };

    case "setAvailableTypes":
      return {
        ...state,
        availableTypes: action.availableTypes,
      };

    case "clear":
      return searchInitialState;

    case "changePokemonType":
      return {
        ...state,
        type: action.pokemonType,
      };
  }
};
