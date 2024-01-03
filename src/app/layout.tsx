import type { Metadata } from "next";
import "./globals.css";
import { Lobster, Bebas_Neue } from "next/font/google";
import { DevTools } from "./Devtools";
import { Provider as JotaiProvider } from "jotai";
import { ThemeSwitcher } from "./ThemeSwitcher";

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
    <html lang="en" className="">
      <body
        className={`${bebasNeue.variable} ${lobster.variable} font-sans h-[100dvh] w-[100dvw] text-gray-800 dark:text-white`}
      >
        <ThemeSwitcher />
        {/* <Provider> */}
        <JotaiProvider>
          <DevTools />
          {children}
        </JotaiProvider>
        {/* <ReactQueryDevtools />
        </Provider> */}
      </body>
    </html>
  );
}
