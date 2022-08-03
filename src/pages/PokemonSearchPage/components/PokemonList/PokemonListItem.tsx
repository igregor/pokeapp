import {
  Avatar,
  Divider,
  ListItemAvatar,
  ListItemButton,
  ListItemText,
} from "@mui/material";

interface PokemonListItemProps {
  name: string;
  thumbnail: string;
  types: string[];
  onItemClick: (name: string) => void;
}

const PokemonListItem: React.FC<PokemonListItemProps> = ({
  name,
  thumbnail,
  types,
  onItemClick,
}) => {
  const handleItemClick = () => {
    onItemClick(name);
  };

  return (
    <>
      <ListItemButton data-testid="pokemon-list-item" onClick={handleItemClick}>
        <ListItemAvatar>
          <Avatar
            src={thumbnail}
            alt={name}
            sx={{ backgroundColor: "background.paper" }}
          />
        </ListItemAvatar>
        <ListItemText primary={name} secondary={types.join(", ")} />
      </ListItemButton>
      <Divider />
    </>
  );
};

export default PokemonListItem;
