import styled from "@emotion/styled";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

export const CardContainer = styled(Card)`
  display: flex;
  width: 100%;
  max-width: 500px;
  text-align: center;
  padding: 1em;
  min-height: 354px;
  align-items: center;
  justify-content: space-between;
`;

export const CardContentContainer = styled(CardContent)`
  width: 100%;
`;

export const FlexContainer = styled(Box)`
  display: flex;
  justify-content: space-between;
`;

export const Temperature = styled(Typography)`
  margin-top: 50px;
`;

export const Subtitle = styled(Typography)`
  color: #999;
`;

export const IconContainer = styled(Box)`
  display: flex;
  align-items: center;
  gap: 5px;
`;
