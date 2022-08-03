interface StatusProps {
  message: string;
}

const Status: React.FC<StatusProps> = ({ message }) => <div>{message}</div>;

export default Status;
