import React from "react";
import {
  ListItemIcon,
  ListItemText,
  ListItemButton,
  Accordion,
  AccordionSummary,
  Typography,
  AccordionDetails,
  ListItem,
  styled,
} from "@mui/material";
import Link from "next/link";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import MenuIcon from "@mui/icons-material/Menu";
import debounce from "debounce";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context";
import { GroupmentType, RouteItem } from "../BurgerMenu/BurgerMenu";

type BurgerMenuGroupProps = {
  routes: RouteItem[];
  router: AppRouterInstance;
  groupment: GroupmentType;
  name?: string;
  icon?: React.ElementType;
};

const AccordionStyled = styled(Accordion)`
  border-top: 1px solid rgba(0, 0, 0, 0.1);
  &.Mui-expanded {
    margin: 0;
  }
`;

const AccordionSummaryStyled = styled(AccordionSummary)`
  transition: all 0.2s ease-in-out;
  &:hover {
    opacity: 0.7;
  }
`;

export const BurgerMenuGroup = ({
  routes,
  router,
  name,
  groupment,
  icon: Icon = MenuIcon,
}: BurgerMenuGroupProps) => {
  return (
    <AccordionStyled
      sx={{
        "&.Mui-expanded": {
          borderTop: "1px solid rgba(0, 0, 0, 0.1)",
          margin: 0,
        },
      }}
    >
      <AccordionSummaryStyled expandIcon={<ExpandMoreIcon />}>
        <ListItemIcon>
          <Icon />
        </ListItemIcon>
        <Typography fontWeight={500}>{name}</Typography>
      </AccordionSummaryStyled>
      <AccordionDetails>
        {routes
          .filter(({ group }) => group === groupment)
          .sort((a: RouteItem, b: RouteItem) => a.text.localeCompare(b.text))
          .map(({ text, icon, path }) => (
            <ListItem key={text} disablePadding>
              <Link
                href={path}
                passHref
                style={{ width: "100%" }}
                onMouseEnter={() => {
                  debounce(() => router.prefetch(path), 300);
                }}
              >
                <ListItemButton>
                  <ListItemIcon>{icon}</ListItemIcon>
                  <ListItemText primary={text} />
                </ListItemButton>
              </Link>
            </ListItem>
          ))}
      </AccordionDetails>
    </AccordionStyled>
  );
};
