import "./globals.css";
import MuiThemeProvider from "./theme";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="th">
      <body>
        <MuiThemeProvider>{children}</MuiThemeProvider>
      </body>
    </html>
  );
}
