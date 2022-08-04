import { Box, Container, Typography } from "@mui/material";

import SearchBar from "./components/SearchBar";
import Status from "./components/Status";
import PokemonList from "./components/PokemonList";

import { useSearch } from "./useSearch";

const PokemonSearchPage: React.FC = () => {
  const {
    changeNameQuery,
    selectType,
    isSearching,
    pokemonList,
    availableTypes,
  } = useSearch();

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
          availableTypes={availableTypes}
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
