import { Alert, AlertTitle } from "@mui/material";

interface SuccessBannerProps {
  message: string;
}

export default function SuccessBanner(props: SuccessBannerProps) {
  const { message } = props;
  return (
    <>
      <br />
      <Alert severity="success">
        <AlertTitle>Error</AlertTitle>
        <strong>{message}</strong>
      </Alert>
    </>
  );
}
