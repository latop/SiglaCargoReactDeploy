import TextField from "@mui/material/TextField";
import styled from "@emotion/styled";

export const AutocompleteContainer = styled("div")`
  width: 100%;
  max-width: 500px;
  position: relative;
`;

export const TextFieldContainer = styled(TextField)`
  z-index: 1000;
`;
