"use client";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { ReactNode } from "react";

export const theme = createTheme({
  palette: {
    primary: { main: "rgb(0, 194, 86)" },
    secondary: { main: "#004482" },
  },
  typography: {
    fontFamily:
      "Helvetica Neue, Helvetica, PingFang SC, Hiragino Sans GB, Microsoft YaHei, Arial, sans-serif",
    h1: { fontWeight: 700 },
    button: { textTransform: "none" },
  },
  shape: {
    borderRadius: 8,
  },
});

export default function MuiThemeProvider({
  children,
}: {
  children: ReactNode;
}) {
  return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
}
