import styled from '@emotion/styled';
import { Card as BaseCard, Typography } from '@mui/material';

export const Card = styled(BaseCard)`
  margin: 10px 0;
  position: absolute;
  width: 100%;
  z-index: 2;
  height: 50vh;
  overflow: auto;
`
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
    background-color: #f5f5f5;
  }

  svg {
    width: 100px;
    height: 20px;
  }
`;

export const Title = styled(Typography)`
  padding: 15px 15px 5px;
`