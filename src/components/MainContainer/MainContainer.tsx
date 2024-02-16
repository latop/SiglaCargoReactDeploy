import { CircularProgress, Box } from "@mui/material";
import { Container } from "./MainContainer.styles";

export function MainContainer({ children }: { children: React.ReactNode }) {
  return <Container>{children}</Container>;
}

function Content({
  children,
  loading,
}: {
  children: React.ReactNode;
  loading: boolean;
}) {
  if (loading) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "calc(100vh - 56px)",
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  return <Box sx={{ padding: "20px" }}>{!loading && children}</Box>;
}

MainContainer.Content = Content;
