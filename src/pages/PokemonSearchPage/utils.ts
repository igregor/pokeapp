import { Pokemon } from "../../services/pokedex/pokedex";

export const getUniqueTypes = (pokemonList: Pokemon[]): string[] => {
  const typesWithDuplicates: string[] = [];

  pokemonList.forEach((pokemon) => {
    typesWithDuplicates.push(...pokemon.type);
  });

  const uniqueTypes = [...new Set(typesWithDuplicates)];

  return uniqueTypes;
};
