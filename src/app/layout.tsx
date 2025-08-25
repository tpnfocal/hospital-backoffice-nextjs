import "./globals.css";
import MuiThemeProvider from "./theme";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v14-appRouter";

export const metadata = { title: "Chula Care Backoffice" };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="th">
      <body>
        {/* ป้องกัน hydration mismatch ของ Emotion/MUI */}
        <AppRouterCacheProvider>
          <MuiThemeProvider>{children}</MuiThemeProvider>
        </AppRouterCacheProvider>
      </body>
    </html>
  );
}