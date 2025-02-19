"use client";
import { Box } from "@mui/material";
import { AppBar } from "@/components/AppBar";
import { HeaderTitle } from "@/components/HeaderTitle/HeaderTitle";
import { MainContainer } from "@/components/MainContainer";
import React, { useState } from "react";
import DriverReleaseFilters from "./components/drivers-release-filters";
import DriverReleaseGrid from "./components/drivers-release-grid";
import {
  DriverReleaseFilterPayload,
  DriverRequestResponse,
  useDriverRequestQuery,
} from "@/services/query/drivers";

const DriversRequestTemplate = () => {
  const [expanded, setExpanded] = React.useState(false);
  const [filters, setFilters] = useState<
    DriverReleaseFilterPayload | undefined
  >();

  const { data, isLoading } = useDriverRequestQuery(filters);

  console.log(data);
  console.log(isLoading);
  const handleApplyFilter = (values: DriverReleaseFilterPayload) => {
    setFilters(values);
    console.log("handleApplyFilter", values);
  };
  return (
    <MainContainer>
      <AppBar style={{ display: expanded ? "none" : "block" }}>
        <HeaderTitle>Solicitação de Motoristas</HeaderTitle>
      </AppBar>
      {JSON.stringify(filters)}
      <Box padding={"20px"}>
        <DriverReleaseFilters onApplySearch={handleApplyFilter} />
        <DriverReleaseGrid data={(data || []) as DriverRequestResponse[]} />
      </Box>
    </MainContainer>
  );
};

export default DriversRequestTemplate;
