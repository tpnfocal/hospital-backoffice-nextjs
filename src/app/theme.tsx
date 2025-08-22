"use client";

import { createTheme, ThemeProvider } from "@mui/material/styles";
import { ReactNode } from "react";

const theme = createTheme({
  typography: {
    fontFamily: [
      "Helvetica Neue",
      "Helvetica",
      "PingFang SC",
      "Hiragino Sans GB",
      "Microsoft YaHei",
      "Arial",
      "sans-serif",
    ].join(","),
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
