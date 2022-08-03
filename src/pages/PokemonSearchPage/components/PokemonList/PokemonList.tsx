import { useState } from "react";
import { List } from "@mui/material";

import PokemonListItem from "./PokemonListItem";
import Status from "../Status";
import DetailsDialog from "../DetailsDialog";

import { Pokemon } from "../../../../services/pokedex";

interface PokemonListProps {
  list: Pokemon[];
}

const PokemonList: React.FC<PokemonListProps> = ({ list }) => {
  const [selectedPokemonName, setSelectedPokemonName] = useState<string | null>(
    null
  );

  const openDetailsDialog = (pokemonsName: string) => {
    setSelectedPokemonName(pokemonsName);
  };

  const closeDetailsDialog = () => {
    setSelectedPokemonName(null);
  };

  const handleItemClick = (name: string) => {
    openDetailsDialog(name);
  };

  return list.length ? (
    <>
      <List data-testid="pokemon-list">
        {list.map((pokemon) => (
          <PokemonListItem
            key={pokemon.id}
            name={pokemon.name.english}
            types={pokemon.type}
            thumbnail={pokemon.image.thumbnail}
            onItemClick={handleItemClick}
          />
        ))}
      </List>

      {selectedPokemonName && (
        <DetailsDialog
          onClose={closeDetailsDialog}
          name={selectedPokemonName}
        />
      )}
    </>
  ) : (
    <Status message="There is no pokemon matching this criteria" />
  );
};

export default PokemonList;
