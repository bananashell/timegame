import type { Metadata } from "next";
import "./globals.css";
import { Glass_Antiqua } from "next/font/google";
import { DevTools } from "./Devtools";
import { Provider as JotaiProvider } from "jotai";

// import Provider from "@/app/_trpc/Provider";
// import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

const glassAntiqua = Glass_Antiqua({ weight: "400", subsets: ["latin"] });

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
    <html lang="en">
      <body className={`${glassAntiqua.className} h-[100dvh] w-[100dvw]`}>
        {/* <Provider> */}
        <JotaiProvider>
          <DevTools />
          {children}
        </JotaiProvider>
        {/* <ReactQueryDevtools /> */}
        {/* </Provider> */}
      </body>
    </html>
  );
}
