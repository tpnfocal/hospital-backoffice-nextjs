"use client";
import { createTheme, ThemeProvider, type Theme } from "@mui/material/styles";
import type { ReactNode } from "react";

export const theme: Theme = createTheme({
  palette: {
    mode: "light",
    primary: { main: "#00C256" }, // rgb(0,194,86)
    secondary: { main: "#004482" },
    success: { main: "#22c55e" },
    warning: { main: "#f59e0b" },
    error: { main: "#ef4444" },
    info: { main: "#0ea5e9" },
    background: { default: "#f5f7fa", paper: "#ffffff" },
    divider: "#e5e7eb",
    text: { primary: "#101828" },
  },
  typography: {
    fontFamily:
      '"Helvetica Neue", Helvetica, PingFang SC, Hiragino Sans GB, "Microsoft YaHei", Arial, sans-serif',
    button: { textTransform: "none", fontWeight: 600, fontSize: 16 },
    h5: { fontWeight: 700, color: "#101828" },
  },
  shape: { borderRadius: 6 },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: { backgroundColor: "#f5f7fa" },
      },
    },
    MuiPaper: {
      styleOverrides: {
        elevation1: { boxShadow: "0px 2px 5px 2px rgba(0, 68, 130, 0.2)" },
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          borderRadius: 999,
          backgroundColor: "#fff",
          "& .MuiOutlinedInput-input": {
            padding: "12px 15px",
            color: "rgb(151,151,151)",
          },
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: { borderRadius: 999, height: 40 },
        containedPrimary: {
          backgroundColor: "#00C256",
          "&:hover": { backgroundColor: "#10b981" },
        },
      },
      defaultProps: { disableElevation: true },
    },
  },
});

export default function MuiThemeProvider({
  children,
}: {
  children: ReactNode;
}) {
  return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
}
