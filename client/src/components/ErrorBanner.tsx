import { Alert, AlertTitle } from "@mui/material";

interface ErrorBannerProps {
  message: string;
}

export default function ErrorBanner(props: ErrorBannerProps) {
  const { message } = props;
  return (
    <>
      <br />
      <Alert severity="error">
        <AlertTitle>Error</AlertTitle>
        <strong>{message}</strong>
      </Alert>
    </>
  );
}
