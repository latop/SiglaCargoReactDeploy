import { css, keyframes } from "@emotion/react";
import styled from "@emotion/styled";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";

export const CardContainer = styled(Card)`
  display: flex;
  width: 100%;
  max-width: 500px;
  text-align: center;
  padding: 1em;
  min-height: 332px;
  align-items: center;
  justify-content: center;
`;

export const CardContentContainer = styled(CardContent)`
  width: 100%;
  position: relative;
  padding: 10px !important;
`;

export const Footer = styled(Box)`
  display: flex;
  justify-content: space-between;
`;

export const Header = styled(Box)`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const IconContainer = styled(Box)`
  display: flex;
  align-items: center;
  position: absolute;
  right: 0;
  bottom: -8px;
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
