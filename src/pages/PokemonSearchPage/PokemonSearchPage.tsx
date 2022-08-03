import { useEffect, useReducer, useState } from "react";
import { pokedexClient, Pokemon } from "../../services/pokedex";

import SearchBar from "./components/SearchBar";
import Status from "./components/Status";
import PokemonList from "./components/PokemonList";

import { searchInitialState, searchReducer } from "./searchReducer";
import { getUniqueTypes } from "./utils";

const PokemonSearchPage: React.FC = () => {
  const [searchState, searchStateDispatch] = useReducer(
    searchReducer,
    searchInitialState
  );
  const [pokemonList, setPokemonList] = useState<Array<Pokemon>>([]);

  const isSearching = !searchState.nameQuery;

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
    } else {
      setPokemonList([]);
    }
  }, [searchState.nameQuery, searchState.type]);

  return (
    <div>
      <h1>Pokedex</h1>

      <SearchBar
        availableTypes={searchState.availableTypes}
        onNameQueryChange={changeNameQuery}
        onTypeSelect={selectType}
      />

      {isSearching ? (
        <Status message="Let's find a pokemon" />
      ) : (
        <PokemonList list={pokemonList} />
      )}
    </div>
  );
};

export default PokemonSearchPage;
