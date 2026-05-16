import type { Metadata } from "next";
import "./globals.css";
import { CursorEffects } from "@/components/cursor-effects";
import { ThemeProvider } from "@/components/theme-provider";

export const metadata: Metadata = {
  title: "FSTE Quiz App",
  description: "Interactive quiz app for MCQs, fill in the blanks, and case-study questions."
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
