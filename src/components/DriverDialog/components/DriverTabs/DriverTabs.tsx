import React from "react";

import { Tabs, Tab, Box } from "@mui/material";
import {
  AttribuitionForm,
  BasesForm,
  FleetsForm,
  PositionsForm,
  VacationsForm,
} from "../DriverSections";
import { TabsType, useDriverDialog } from "../../useDriverDialog";

const tabsMap: Record<TabsType, string> = {
  driverAttributions: "Atribuições do Motorista",
  driverBases: "Bases do Motorista",
  driverFleets: "Frotas do Motorista",
  driverPositions: "Posições do Motorista",
  driverVacations: "Férias do Motorista",
};

const TabContent: Record<TabsType, React.ReactNode> = {
  driverAttributions: <AttribuitionForm />,
  driverBases: <BasesForm />,
  driverFleets: <FleetsForm />,
  driverPositions: <PositionsForm />,
  driverVacations: <VacationsForm />,
};

export const DriverTabs = () => {
  const { selectedTab, setSelectedTab } = useDriverDialog();
  const handleChange = (_: React.SyntheticEvent, newValue: TabsType) => {
    setSelectedTab(newValue);
  };

  const tabsCount = Object.keys(tabsMap).length;

  return (
    <Box sx={{ width: "100%" }}>
      <Tabs
        value={selectedTab}
        onChange={handleChange}
        aria-label="Driver tabs"
      >
        {Object.keys(tabsMap).map((tabKey) => (
          <Tab
            key={tabKey}
            label={tabsMap[tabKey as TabsType]}
            value={tabKey as TabsType}
            sx={{
              width: `calc(100% / ${tabsCount})`,
              borderBottom: "solid 1px #b0bec5",
            }}
          />
        ))}
      </Tabs>
      <Box sx={{ paddingTop: 2 }}>{TabContent[selectedTab]}</Box>
    </Box>
  );
};
