import type { Metadata } from "next";
import "./globals.css";
import { Lobster, Bebas_Neue } from "next/font/google";
import { DevTools } from "./Devtools";
import { Provider as JotaiProvider } from "jotai";
import { ThemeSwitcher } from "./ThemeSwitcher";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";

const lobster = Lobster({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-lobster",
});
const bebasNeue = Bebas_Neue({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-bebas-neue",
});

export const metadata: Metadata = {
  title: "Timeline",
  description: "A chronoligical game on the sacred timeline",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="h-full">
      <body
        className={`${bebasNeue.variable} ${lobster.variable} font-sans h-full w-full overscroll-none absolute top-0 left-0 text-gray-800 dark:text-white`}
      >
        <ThemeSwitcher />
        {/* <Provider> */}
        <JotaiProvider>
          <DevTools />
          <section className="relative h-full w-full">{children}</section>
        </JotaiProvider>
        {/* </Provider> */}
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
