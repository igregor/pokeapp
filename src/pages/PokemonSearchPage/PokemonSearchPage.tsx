import { useEffect, useReducer, useState } from "react";
import { Box, Container, Typography } from "@mui/material";

import SearchBar from "./components/SearchBar";
import Status from "./components/Status";
import PokemonList from "./components/PokemonList";

import { searchInitialState, searchReducer } from "./searchReducer";
import { getUniqueTypes } from "./utils";
import { pokedexClient, Pokemon } from "../../services/pokedex";

const PokemonSearchPage: React.FC = () => {
  const [searchState, searchStateDispatch] = useReducer(
    searchReducer,
    searchInitialState
  );
  const [pokemonList, setPokemonList] = useState<Array<Pokemon>>([]);
  const [isSearching, setIsSearching] = useState(false);

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

  return (
    <Container maxWidth="md">
      <Box
        sx={{
          position: "sticky",
          top: 0,
          backgroundColor: "background.paper",
          zIndex: 1,
        }}
      >
        <Typography variant="h4" gutterBottom={true}>
          Pokedex
        </Typography>

        <SearchBar
          availableTypes={searchState.availableTypes}
          onNameQueryChange={changeNameQuery}
          onTypeSelect={selectType}
        />
      </Box>

      {isSearching ? (
        <Status message="Let's find a pokemon" />
      ) : (
        <PokemonList list={pokemonList} />
      )}
    </Container>
  );
};

export default PokemonSearchPage;
