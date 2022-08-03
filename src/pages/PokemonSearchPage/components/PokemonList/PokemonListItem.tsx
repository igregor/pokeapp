interface PokemonListItemProps {
  name: string;
  thumbnail: string;
  onItemClick: (name: string) => void;
}

const PokemonListItem: React.FC<PokemonListItemProps> = ({
  name,
  thumbnail,
  onItemClick,
}) => {
  const handleItemClick = () => {
    onItemClick(name);
  };

  return (
    <div data-testid="pokemon-list-item" onClick={handleItemClick}>
      <p>{name}</p>
      <img src={thumbnail} alt={name} />
    </div>
  );
};

export default PokemonListItem;
