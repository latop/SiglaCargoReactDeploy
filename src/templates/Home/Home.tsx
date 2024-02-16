"use client";

import React from "react";
import { MainContainer } from "@/components/MainContainer";
import { AppBar } from "@/components/AppBar";
import { HeaderTitle } from "@/components/HeaderTitle/HeaderTitle";

export function Home() {
  return (
    <MainContainer>
      <AppBar>
        <HeaderTitle>Home</HeaderTitle>
      </AppBar>
    </MainContainer>
  );
}
