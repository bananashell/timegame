import type { Metadata } from "next";
import { Glass_Antiqua } from "next/font/google";
import "./globals.css";

import Provider from "@/app/_trpc/Provider";
import { GameEngineProvider } from "./_context/gameEngineContext";

const glassAntiqua = Glass_Antiqua({ weight: "400", subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${glassAntiqua.className} h-screen w-screen`}>
        <Provider>
          <GameEngineProvider>{children}</GameEngineProvider>
        </Provider>
      </body>
    </html>
  );
}
