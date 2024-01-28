"use client";

import { trpc } from "@/app/_trpc/serverClient";
import { motion } from "framer-motion";
import { twMerge } from "tailwind-merge";
import { ShareStatistics } from "./ShareStatistics";
import { TrendingDown, TrendingUp } from "@mui/icons-material";

export const Statistics = ({
  data,
}: {
  data: Awaited<ReturnType<typeof trpc.getStatistics>>;
}) => {
  return (
    <section className="px-2 max-w-full">
      <motion.header
        className="text-center dark:drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.6)] flex flex-col"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h2>{data.username}</h2>
        <h1>Statistik</h1>
      </motion.header>
      <motion.ol
        data-current-game-id={data.gameId}
        className="rounded-xl relative z-10 divide-y drop-shadow-lg bg-white dark:bg-gray-800 inline-flex w-96 max-w-full flex-col"
        variants={container}
        initial="hidden"
        animate="show"
      >
        <StatisticsItem
          title={"Poäng"}
          value={data.statistics.score}
          postfix="p"
          average={data.averages?.avgScorePerGame}
        />
        <StatisticsItem
          title={"Händelser"}
          value={data.statistics.noEvents}
          postfix={"st"}
          average={data.averages?.avgEventCountPerGame}
        />
        <StatisticsItem
          title={"Fullpottar"}
          value={data.statistics.noCorrectGuesses}
          postfix={"st"}
          average={data.averages?.avgCorrectGuessesPerGame}
        />
        <StatisticsItem
          title={"Totalt år fel"}
          value={data.statistics.yearsOff}
          postfix={"år"}
          average={data.averages?.avgYearsOffPerGame}
        />
        <StatisticsItem
          title={"Snitt år fel"}
          value={Math.round(data.statistics.averageYearsOff)}
          postfix={"år"}
          average={
            data.averages && Math.round(data.averages?.avgYearsOffPerEvent)
          }
        />
      </motion.ol>
      <section className="mt-8 flex items-end justify-center">
        <ShareStatistics data={data} />
      </section>
    </section>
  );
};

const StatisticsItem = ({
  title,
  value,
  average,
  postfix,
}: {
  title: string;
  value: number;
  average?: number;
  postfix: string;
}) => {
  return (
    <motion.li
      className={twMerge(
        `grid grid-cols-3 py-2 justify-center items-center px-8`,
      )}
      variants={item}
    >
      <span className="text-2xl text-left col-span-2 ">{title}</span>
      <span className="text-2xl text-right flex gap-2 items-center justify-end whitespace-nowrap">
        <BetterOrWorse value={value} average={average} postfix={postfix} />
        {value} {postfix}
      </span>
    </motion.li>
  );
};

const BetterOrWorse = ({
  value,
  average,
  postfix,
}: {
  value: number;
  average?: number;
  postfix: string;
}) => {
  const betterOrWorse = getBetterOrWorse(value, average);
  if (betterOrWorse === undefined) return null;

  return (
    <div className="text-base">
      {betterOrWorse == "better" && <TrendingUp className="text-green-500" />}
      {betterOrWorse == "worse" && <TrendingDown className="text-red-500" />}
      <span className="italic">
        ({average?.toFixed(0)} {postfix})
      </span>
    </div>
  );
};

const getBetterOrWorse = (value: number, average?: number) => {
  if (average === undefined) return undefined;
  if (value > average) return "better";
  if (value < average) return "worse";

  return "same";
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
