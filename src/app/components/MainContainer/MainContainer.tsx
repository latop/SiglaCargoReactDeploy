import { Container } from "./MainContainer.styles";

export function MainContainer({ children }: { children: React.ReactNode }) {
  return <Container>{children}</Container>;
}