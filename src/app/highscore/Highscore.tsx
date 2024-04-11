"use client";

import { trpc } from "@/app/_trpc/serverClient";
import { GameId } from "@/data/db/game/gameId";
import { GameType } from "@/gameEngine/gameState";
import { motion } from "framer-motion";
import { twMerge } from "tailwind-merge";
import { GameTypeIcon } from "@/app/_components/GameTypeIcon";

export const Highscore = ({
  gameId,
  data: { highscores, week, year },
}: {
  gameId?: string;
  data: Awaited<ReturnType<typeof trpc.getHighscore>>;
}) => {
  return (
    <section className="px-2 max-w-full">
      <motion.header
        className="text-center dark:drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.6)] flex flex-col"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h2>
          vecka {week} {year}
        </h2>
        <h1>Topplista</h1>
      </motion.header>
      <motion.ol
        data-current-game-id={gameId}
        className="rounded-xl relative z-10 divide-y drop-shadow-lg bg-white dark:bg-gray-800 inline-flex w-96 max-w-full flex-col"
        variants={container}
        initial="hidden"
        animate="show"
      >
        {highscores.length === 0 && (
          <HighscoreItem
            score={{ gameId: "", score: 0, noEvents: 0, username: "John Doe" }}
            gameId={gameId}
          />
        )}
        {highscores.map((score, i) => (
          <HighscoreItem score={score} gameId={gameId} key={score.gameId} />
        ))}
      </motion.ol>
    </section>
  );
};

const HighscoreItem = ({
  gameId,
  score,
}: {
  gameId?: string;
  score: Awaited<ReturnType<typeof trpc.getHighscore>>["highscores"][number];
}) => {
  var parseResult = GameId.tryParse(score.gameId);
  let gameType: GameType = parseResult?.success
    ? parseResult.result.gameType
    : "all";

  return (
    <motion.li
      key={score.gameId}
      data-game-id={score.gameId}
      className={twMerge(
        `grid grid-cols-4 py-2 justify-center items-center px-8`,
        gameId === score.gameId && `bg-gray-600/20 dark:bg-white/30`,
      )}
      variants={item}
    >
      <Medal place={score.position} />

      <span className="text-xl text-center col-span-2 ">
        <GameTypeIcon gameType={gameType} /> {score.username}
      </span>
      <span className="text-lg text-right">{score.score} p</span>
    </motion.li>
  );
};

export const Medal = ({ place }: { place?: number }) => {
  const medal = medalBackground[place as keyof typeof medalBackground];

  if (!medal)
    return (
      <span className="w-8 text-center">
        {place && <>#{place}</>}
        {!place && <>-</>}
      </span>
    );

  return (
    <div
      className={twMerge(
        `rounded-full w-8 aspect-square text-bold text-center flex justify-center items-center text-white`,
        medal,
      )}
    >
      <span>{place}</span>
    </div>
  );
};

const medalBackground = {
  1: "bg-[#F4CB17]",
  2: "bg-[#C0C0C0]",
  3: "bg-[#CD7F32]",
};

const container = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.3,
    },
  },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
};
