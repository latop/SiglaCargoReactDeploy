import TextField from '@mui/material/TextField';
import Backdrop from '@mui/material/Backdrop';
import styled from '@emotion/styled';

export const AutocompleteContainer = styled('div')`
  width: 100%;
  max-width: 500px;
`;

export const TextFieldContainer = styled(TextField)`
  z-index: 1000;
`;

export const BackdropContainer = styled(Backdrop)`
  color: #fff;
  z-index: 1;
`;