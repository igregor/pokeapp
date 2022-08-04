import { useEffect, useReducer, useState } from "react";

import { searchInitialState, searchReducer } from "./searchReducer";
import { getUniqueTypes } from "./utils";
import { pokedexClient, Pokemon } from "../../services/pokedex";

export const useSearch = (): {
  pokemonList: Array<Pokemon>;
  isSearching: boolean;
  availableTypes: string[];
  changeNameQuery: (name: string) => void;
  selectType: (type: string) => void;
} => {
  const [searchState, searchStateDispatch] = useReducer(
    searchReducer,
    searchInitialState
  );
  const [pokemonList, setPokemonList] = useState<Array<Pokemon>>([]);
  const [isSearching, setIsSearching] = useState(false);

  const availableTypes = searchState.availableTypes;

  const changeNameQuery = (name: string): void => {
    if (name) {
      searchStateDispatch({ type: "changeNameQuery", query: name });
    } else {
      searchStateDispatch({ type: "clear" });
    }
  };

  const selectType = (type: string): void => {
    searchStateDispatch({ type: "changePokemonType", pokemonType: type });
  };

  useEffect(() => {
    const name = searchState.nameQuery;
    const type = searchState.type;

    if (name) {
      const newList = pokedexClient.listPokemon({ name, type });

      const availableTypes = getUniqueTypes(newList);
      searchStateDispatch({ type: "setAvailableTypes", availableTypes });
      setPokemonList(newList);
      setIsSearching(false);
    } else {
      setPokemonList([]);
      setIsSearching(true);
    }
  }, [searchState.nameQuery, searchState.type]);

  return {
    pokemonList,
    isSearching,
    availableTypes,
    changeNameQuery,
    selectType,
  };
};
