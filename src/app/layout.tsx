import "./globals.css";
import ThemeProviderRuntime from "./ThemeProviderRuntime";

export const metadata = { title: "Chula Care Backoffice" };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="th">
      <body>
        <ThemeProviderRuntime>{children}</ThemeProviderRuntime>
      </body>
    </html>
  );
}