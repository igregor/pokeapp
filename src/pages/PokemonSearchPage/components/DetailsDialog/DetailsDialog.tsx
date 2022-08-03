import { useCallback, useEffect, useState } from "react";
import {
  Avatar,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Typography,
} from "@mui/material";

import { pokedexClient, Pokemon } from "../../../../services/pokedex";

interface DetailsDialogProps {
  name: string;
  onClose: () => void;
}

const DetailsDialog: React.FC<DetailsDialogProps> = ({ name, onClose }) => {
  const [pokemonDetails, setPokemonDetails] = useState<Pokemon>();

  const handleClose = useCallback(() => {
    onClose();
  }, [onClose]);

  /* 
    NOTE @g.wojtanowicz This is to "express possible solution".
    Within the <List /> we might fetch lightweight DTO of the pokemon for the performance reason - as we have "many" items fetched.
    Here we could fetch more detailed DTO.
    It does not matter much in this test task I believe:)
   */
  useEffect(() => {
    const pokemonDetails = pokedexClient.getPokemonByName(name);

    if (pokemonDetails) {
      setPokemonDetails(pokemonDetails);
    }
  }, [name]);

  return (
    <>
      {pokemonDetails && (
        <Dialog onClose={onClose} open={true} data-testid="details-dialog">
          <DialogTitle>{pokemonDetails.name.english}</DialogTitle>
          <DialogContent>
            <Avatar
              alt={pokemonDetails.name.english}
              src={pokemonDetails.image.sprite}
              sx={{ width: 56, height: 56 }}
            />
            <Typography>{pokemonDetails.description}</Typography>
          </DialogContent>

          <DialogActions>
            <Button onClick={handleClose}>Close</Button>
          </DialogActions>
        </Dialog>
      )}
    </>
  );
};

export default DetailsDialog;