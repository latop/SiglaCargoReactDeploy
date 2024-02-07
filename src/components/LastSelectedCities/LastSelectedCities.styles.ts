import styled from "@emotion/styled";
import { Card as BaseCard, Typography } from "@mui/material";
import { grey } from "@mui/material/colors";

export const Card = styled(BaseCard)`
  margin: 10px 0;
  position: absolute;
  width: 100%;
  z-index: 2;
  overflow: auto;
`;
export const Container = styled.ul`
  list-style: none;
  margin: 10px 0;
  display: flex;
  flex-direction: column;
`;

export const Item = styled.li`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 10px;
  cursor: pointer;
  padding: 10px;
  &:hover {
    background-color: ${grey[100]};
  }

  svg {
    width: 20px;
    height: 20px;
  }
`;

export const Title = styled(Typography)`
  padding: 15px 15px 5px;
  font-weight: 500;
`;

export const ItemTitle = styled(Typography)`
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  width: 100%;
  display: block;
`;
