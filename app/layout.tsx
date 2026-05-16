import type { Metadata } from "next";
import "./globals.css";
import { CursorEffects } from "@/components/cursor-effects";
import { ThemeProvider } from "@/components/theme-provider";

export const metadata: Metadata = {
  title: "Quiz Time",
  description: "Interactive quiz platform for FSTE and Tech and Policy question banks."
};

export default function RootLayout({
  children
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <ThemeProvider>
          <CursorEffects />
          <div className="relative z-10">{children}</div>
        </ThemeProvider>
      </body>
    </html>
  );
}
