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
  return (
    <Box
      sx={{
        padding: "0 20px",
        flex: 1,
        display: "flex",
        flexDirection: "column",
        overflowY: "auto",
        position: "relative",
      }}
    >
      {loading && <CircularProgress sx={{ margin: "auto" }} />}
      {!loading && children}
    </Box>
  );
}

MainContainer.Content = Content;
