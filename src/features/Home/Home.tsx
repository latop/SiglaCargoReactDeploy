"use client";
import React from "react";
import { MainContainer } from "@/components/MainContainer";
import { AppBar } from "@/components/AppBar";
import { HeaderTitle } from "@/components/HeaderTitle/HeaderTitle";
import { useQuery } from "@tanstack/react-query";
import { useGetDashboardQuery } from "@/services/query/dashboard.query";

export function Home() {
  const { data, isLoading, isError } = useQuery(useGetDashboardQuery);

  return (
    <MainContainer>
      <AppBar>
        <HeaderTitle>Home</HeaderTitle>
      </AppBar>
      {isLoading && <div>Loading...</div>}
      {isError && <div>Error</div>}
      {JSON.stringify(data)}
    </MainContainer>
  );
}
