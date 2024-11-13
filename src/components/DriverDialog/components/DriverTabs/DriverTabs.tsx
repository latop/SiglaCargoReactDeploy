import React, { useState } from "react";

import { Tabs, Tab, Box } from "@mui/material";

type TabsType =
  | "driverAttributions"
  | "driverBases"
  | "driverFleets"
  | "driverPositions"
  | "driverVacations";

const tabsMap: Record<TabsType, string> = {
  driverAttributions: "Atribuições do Motorista",
  driverBases: "Bases do Motorista",
  driverFleets: "Frotas do Motorista",
  driverPositions: "Posições do Motorista",
  driverVacations: "Férias do Motorista",
};

const TabContent: Record<TabsType, React.ReactNode> = {
  driverAttributions: <div>Atribuições do Motorista</div>,
  driverBases: <div>Bases do Motorista</div>,
  driverFleets: <div>Frotas do Motorista</div>,
  driverPositions: <div>Posições do Motorista</div>,
  driverVacations: <div>Férias do Motorista</div>,
};

export const DriverTabs = () => {
  const [selectedTab, setSelectedTab] =
    useState<TabsType>("driverAttributions");

  const handleChange = (event: React.SyntheticEvent, newValue: TabsType) => {
    setSelectedTab(newValue);
  };

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
          />
        ))}
      </Tabs>
      <Box sx={{ padding: 2 }}>{TabContent[selectedTab]}</Box>
    </Box>
  );
};
