import { memo } from "react";
import { List } from "@mui/material";

import PokemonListItem from "./PokemonListItem";

import { Pokemon } from "../../../../services/pokedex";

interface PokemonListContentProps {
  list: Pokemon[];
  openDetailsDialog: (name: string) => void;
}

const PokemonListContent: React.FC<PokemonListContentProps> = ({
  list,
  openDetailsDialog,
}) => {
  const handleItemClick = (name: string) => {
    openDetailsDialog(name);
  };

  return (
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
  );
};

export default memo(PokemonListContent);
