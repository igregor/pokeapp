import { Typography } from "@mui/material";

interface StatusProps {
  message: string;
}

const Status: React.FC<StatusProps> = ({ message }) => (
  <Typography variant="body1" sx={{ py: 4 }}>
    {message}
  </Typography>
);

export default Status;
