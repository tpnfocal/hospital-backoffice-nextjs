import "@mui/material/styles";

declare module "@mui/material/styles" {
  interface Theme {
    custom: {
      nav: {
        expanded: number;
        collapsed: number;
      };
      toolbarHeight: number;
      sidebarGradient: string;
    };
  }
  interface ThemeOptions {
    custom?: {
      nav?: {
        expanded?: number;
        collapsed?: number;
      };
      toolbarHeight?: number;
      sidebarGradient?: string;
    };
  }
}
