import { AppBar } from "@/components/AppBar";
import { HeaderTitle } from "@/components/HeaderTitle/HeaderTitle";
import { MainContainer } from "@/components/MainContainer";

export function Reports() {
  return (
    <MainContainer>
      <AppBar style={{ display: "block" }}>
        <HeaderTitle>Relatórios</HeaderTitle>
      </AppBar>
    </MainContainer>
  );
}
