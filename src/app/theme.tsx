"use client";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import type { ReactNode } from "react";
import { Theme } from "@mui/material/styles";

const cssVar = (name: string) => `var(${name})`;

export const theme = createTheme({
  palette: {
    mode: "light",
    primary: { main: cssVar("--color-primary") },
    secondary: { main: cssVar("--color-secondary") },
    background: {
      default: cssVar("--bg"),
      paper: cssVar("--paper"),
    },
    divider: cssVar("--divider"),
    success: { main: cssVar("--color-success") },
    warning: { main: cssVar("--color-warning") },
    error: { main: cssVar("--color-error") },
    info: { main: cssVar("--color-info") },
  },
  typography: {
    fontFamily: cssVar("--font-base"),
    button: { textTransform: "none", fontWeight: 600, fontSize: 16 },
    h5: { fontWeight: 700, color: cssVar("--text") },
  },
  shape: { borderRadius: 6 },
  shadows: [
  "none",
  cssVar("--shadow-1"),
  cssVar("--shadow-2"),
  ...Array(22).fill(cssVar("--shadow-1")),
] as Theme["shadows"],
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: { backgroundColor: cssVar("--bg") },
      },
    },
    MuiPaper: {
      styleOverrides: {
        elevation1: { boxShadow: cssVar("--shadow-2") },
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          borderRadius: cssVar("--radius-pill"),
          backgroundColor: cssVar("--paper"),
          "& .MuiOutlinedInput-input": {
            padding: "12px 15px",
            color: "rgb(151,151,151)",
          },
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: { borderRadius: cssVar("--radius-pill"), height: 40 },
        containedPrimary: {
          backgroundColor: cssVar("--color-primary"),
          "&:hover": { backgroundColor: cssVar("--color-primary-600") },
        },
      },
      defaultProps: { disableElevation: true },
    },
    MuiToolbar: {
      styleOverrides: {
        root: { minHeight: 56 }, // fallback; จะอิง custom.toolbarHeight ที่ AppShell
      },
    },
  },
  custom: {
    nav: { expanded: 220, collapsed: 64 },
    toolbarHeight: 56,
    sidebarGradient:
      "linear-gradient(180deg, #34d399 0%, #10b981 50%, #059669 100%)",
  },
});

export default function MuiThemeProvider({
  children,
}: {
  children: ReactNode;
}) {
  return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
}
