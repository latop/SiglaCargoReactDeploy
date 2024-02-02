import styled from "@emotion/styled";
import { keyframes, css } from "@emotion/react";
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
  justify-content: center;
`;

export const CardContentContainer = styled(CardContent)`
  width: 100%;
`;

export const Footer = styled(Box)`
  display: flex;
  justify-content: space-between;
`;

export const Header = styled(Box)`
  display: flex;
  justify-content: space-between;
  border-bottom: 1px solid #f4f4f4;
  padding-bottom: 10px;
  align-items: center;
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

const rotate = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`;

export const UpdateContainer = styled.div<{
  isUpdating: boolean;
}>`
  display: inline-block;
  cursor: pointer;
  animation: ${(props) =>
    props.isUpdating
      ? css`
          ${rotate} 2s linear infinite
        `
      : "none"};
`;
