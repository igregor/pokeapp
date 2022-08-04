import { useCallback, useState } from "react";

import Status from "../Status";
import DetailsDialog from "../DetailsDialog";

import { Pokemon } from "../../../../services/pokedex";
import PokemonListContent from "./PokemonListContent";

interface PokemonListProps {
  list: Pokemon[];
}

const PokemonList: React.FC<PokemonListProps> = ({ list }) => {
  const [selectedPokemonName, setSelectedPokemonName] = useState<string | null>(
    null
  );

  const openDetailsDialog = useCallback((pokemonsName: string) => {
    setSelectedPokemonName(pokemonsName);
  }, []);

  const closeDetailsDialog = () => {
    setSelectedPokemonName(null);
  };

  return list.length ? (
    <>
      <PokemonListContent list={list} openDetailsDialog={openDetailsDialog} />

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
