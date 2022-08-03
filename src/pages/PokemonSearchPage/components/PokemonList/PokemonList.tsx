import PokemonListItem from "./PokemonListItem";

import Status from "../Status";
import { useState } from "react";
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
      <div data-testid="pokemon-list">
        {list.map((pokemon) => (
          <PokemonListItem
            onItemClick={handleItemClick}
            key={pokemon.id}
            name={pokemon.name.english}
            thumbnail={pokemon.image.thumbnail}
          />
        ))}
      </div>

      {selectedPokemonName && (
        <DetailsDialog
          onClose={closeDetailsDialog}
          name={selectedPokemonName}
        />
      )}
    </>
  ) : (
    <Status message="There are no pokemon matching this criteria" />
  );
};

export default PokemonList;
