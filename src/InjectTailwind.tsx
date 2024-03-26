import { StyledEngineProvider } from "@mui/styled-engine";

export default function InjectTailwind({ children }: any) {
  return <StyledEngineProvider injectFirst>{children}</StyledEngineProvider>;
}
