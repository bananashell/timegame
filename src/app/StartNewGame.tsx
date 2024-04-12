"use client";

import { ReactNode, useState } from "react";
import { useStartNewGame } from "@/app/state/actions";
import { twMerge } from "tailwind-merge";
import { AnimatePresence, motion } from "framer-motion";
import { usernameAtom } from "./state";
import { useAtom } from "jotai";
import { useRouter } from "next/navigation";
import { GameType } from "@/gameEngine/gameState";
import { MusicNote, Schedule } from "@mui/icons-material";

export const StartNewGame = () => {
  const router = useRouter();
  const [state, setState] = useState<
    "initial" | "name select" | "game type select"
  >("initial");
  const [username, setUsername] = useAtom(usernameAtom);

  const {
    mutateAsync: startNewGameAsync,
    isLoading,
    isIdle,
    isError,
    isSuccess,
  } = useStartNewGame();

  // const handleKeyUp = async (e: React.KeyboardEvent<HTMLInputElement>) => {
  //   if (e.key == "Enter") {
  //     await next();
  //   }
  // };

  const gotoTypeSelect = async () => {
    if (state != "name select") {
      return;
    }

    setState("game type select");
  };

  const startNewGame = async ({ gameType }: { gameType: GameType }) => {
    const data = await startNewGameAsync({ gameType });
    if (!data) throw new Error("Failed to start new game");

    router.push(`/game/${data.game.salt}`);
  };

  return (
    <section className="w-full h-full">
      <AnimatePresence initial={false}>
        {state == "initial" && (
          <motion.header
            key="initial"
            initial={{ scale: 1, opacity: 1 }}
            animate={{ scale: 1, opacity: 1, x: "-50%", y: "-50%" }}
            exit={{ scale: 0.5, opacity: 0 }}
            transition={{ duration: 0.2 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9, opacity: 0.9 }}
            onClick={() => setState("name select")}
            className="top-1/2 left-1/2 absolute w-full max-w-lg select-none cursor-pointer drop-shadow-xl p-8 rounded-full aspect-square justify-center inline-flex flex-col items-center border-8 border-[#dedac2] bg-[#85d1c0] text-white"
          >
            <h2 className="uppercase">Välkommen till</h2>
            <StrokeHeader
              className="lg:scale-150 -translate-y-2 lg:-translate-y-4"
              textColor="text-white"
            >
              Tidslinjen
            </StrokeHeader>
            <h2>Starta nytt spel</h2>
          </motion.header>
        )}

        {state == "name select" && (
          <>
            {isLoading || (isSuccess && <>Loading...</>)}
            {isError && <>Error</>}
            {isIdle && (
              <motion.header
                key="name select"
                initial={{ scale: 0.5, opacity: 0.5, x: "-50%", y: "-50%" }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="top-1/2 left-1/2 text-center absolute w-full max-w-lg select-none cursor-pointer drop-shadow-lg p-8 rounded-full aspect-square justify-center flex flex-col items-center border-8 border-[#dedac2] bg-[#85d1c0] text-white"
              >
                <h2>{"Vad heter du?"}</h2>
                <input
                  value={username}
                  onChange={(e) => {
                    global.localStorage.setItem("username", e.target.value);
                    setUsername(e.target.value);
                  }}
                  type="text"
                  className="bg-transparent text-white text-center outline-none caret-white text-8xl max-w-full"
                  maxLength={12}
                  autoFocus
                />
                <motion.button
                  whileTap={{ scale: 0.8 }}
                  initial={{ scale: 1 }}
                  disabled={!username}
                  onClick={gotoTypeSelect}
                  className="transition-colors select-none text-4xl mt-2 disabled:text-white/20"
                >
                  Nästa
                </motion.button>
              </motion.header>
            )}
          </>
        )}

        {state == "game type select" && (
          <section className="absolute w-full h-full flex flex-col justify-center items-center text-black">
            <section className=" grid grid-rows-2 gap-2 items-center justify-center">
              {selectableGameTypes.map((gt) => (
                <motion.button
                  key={gt.type}
                  className="py-2 px-4 rounded-xl border-4 border-[#dedac2] bg-[#85d1c0] text-white"
                  whileTap={{ scale: 0.9 }}
                  onClick={() => startNewGame({ gameType: gt.type })}
                >
                  <div className="flex gap-2 justify-center items-center">
                    {gt.icon} <span className="text-xl">{gt.title}</span>
                  </div>
                </motion.button>
              ))}
            </section>
          </section>
        )}
      </AnimatePresence>
    </section>
  );
};

const selectableGameTypes: {
  type: GameType;
  icon: ReactNode;
  title: string;
}[] = [
  {
    type: "music",
    icon: <MusicNote sx={{ fontSize: 50 }} />,
    title: "Musikfrågor",
  },
  {
    type: "history",
    icon: <Schedule sx={{ fontSize: 50 }} />,
    title: "Historia",
  },
];

const StrokeHeader = ({
  children,
  backdropColor,
  textColor,
  className,
}: {
  children: ReactNode;
  backdropColor?: string;
  textColor?: string;
  className?: string;
}) => {
  return (
    <div className={twMerge("relative font-50s text-xs", className)}>
      <h1
        className={twMerge(
          "text-zinc-600 translate-x-1 translate-y-1 absolute top-0 left-0 font-50s",
          backdropColor,
        )}
      >
        {children}
      </h1>
      <h1
        className={twMerge(
          "text-neutral-100 absolute top-0 left-0 font-50s",
          textColor,
        )}
      >
        {children}
      </h1>
      <h1 className="text-transparent">{children}</h1>
    </div>
  );
};
