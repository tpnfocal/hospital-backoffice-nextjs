"use client";

import { useEffect, useMemo, useState } from "react";
import { createTheme, ThemeProvider, type Theme } from "@mui/material/styles";

function resolveVar(name: string, fallback: string) {
  if (typeof window === "undefined") return fallback;
  const v = getComputedStyle(document.documentElement)
    .getPropertyValue(name)
    .trim();
  return v || fallback;
}

function buildThemeFromCssVars(): Theme {
  const primary = resolveVar("--color-primary", "#00C256");
  const secondary = resolveVar("--color-secondary", "#004482");
  const success = resolveVar("--color-success", "#22c55e");
  const warning = resolveVar("--color-warning", "#f59e0b");
  const error = resolveVar("--color-error", "#ef4444");
  const info = resolveVar("--color-info", "#0ea5e9");

  const bg = resolveVar("--bg", "#f5f7fa");
  const paper = resolveVar("--paper", "#ffffff");
  const divider = resolveVar("--divider", "#e5e7eb");
  const text = resolveVar("--text", "#101828");
  const fontBase = resolveVar("--font-base", "system-ui, sans-serif");

  const shadow1 = resolveVar("--shadow-1", "0 1px 2px rgba(16,24,40,0.06)");
  const shadow2 = resolveVar(
    "--shadow-2",
    "0px 2px 5px 2px rgba(0, 68, 130, 0.2)"
  );
  const radiusPill = resolveVar("--radius-pill", "999px");

  const sidebarGradient = resolveVar(
    "--sidebar-gradient",
    "linear-gradient(180deg, #34d399 0%, #10b981 50%, #059669 100%)"
  );

  const t = createTheme({
    palette: {
      mode: "light",
      primary: { main: primary },
      secondary: { main: secondary },
      success: { main: success },
      warning: { main: warning },
      error: { main: error },
      info: { main: info },
      background: { default: bg, paper: paper },
      divider,
      text: { primary: text },
    },
    typography: {
      fontFamily: fontBase,
      button: { textTransform: "none", fontWeight: 600, fontSize: 16 },
      h5: { fontWeight: 700, color: text },
    },
    shape: { borderRadius: 6 },
    shadows: [
      "none",
      shadow1,
      shadow2,
      ...Array(22).fill(shadow1),
    ] as unknown as Theme["shadows"],
    components: {
      MuiCssBaseline: {
        styleOverrides: {
          body: { backgroundColor: bg },
        },
      },
      MuiPaper: {
        styleOverrides: {
          elevation1: { boxShadow: shadow2 },
        },
      },
      MuiOutlinedInput: {
        styleOverrides: {
          root: {
            borderRadius: radiusPill,
            backgroundColor: paper,
            "& .MuiOutlinedInput-input": {
              padding: "12px 15px",
              color: "rgb(151,151,151)",
            },
          },
        },
      },
      MuiButton: {
        styleOverrides: {
          root: { borderRadius: radiusPill, height: 40 },
          containedPrimary: {
            backgroundColor: primary,
            "&:hover": { backgroundColor: success },
          },
        },
        defaultProps: { disableElevation: true },
      },
    },
  });

  t.custom = {
    nav: { expanded: 220, collapsed: 64 },
    toolbarHeight: 56,
    sidebarGradient,
  };

  return t;
}

export default function ThemeProviderRuntime({
  children,
}: {
  children: React.ReactNode;
}) {
  const [theme, setTheme] = useState<Theme>(() => buildThemeFromCssVars());

  useEffect(() => {
    const rebuild = () => setTheme(buildThemeFromCssVars());

    rebuild();

    const observer = new MutationObserver((muts) => {
      for (const m of muts) {
        if (m.type === "attributes" && m.attributeName === "data-theme") {
          rebuild();
          break;
        }
      }
    });
    observer.observe(document.documentElement, { attributes: true });

    const onRebuild = () => rebuild();
    window.addEventListener("rebuild-theme", onRebuild);

    return () => {
      observer.disconnect();
      window.removeEventListener("rebuild-theme", onRebuild);
    };
  }, []);

  return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
}
