"use client";

import { trpc } from "@/app/_trpc/serverClient";
import { motion } from "framer-motion";
import { twMerge } from "tailwind-merge";

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
        <StatisticsItem title={"Poäng"} value={`${data.statistics.score} p`} />
        <StatisticsItem
          title={"Händelser"}
          value={`${data.statistics.noEvents} st`}
        />
        <StatisticsItem
          title={"Fullpottar"}
          value={`${data.statistics.noCorrectGuesses} st`}
        />
        <StatisticsItem
          title={"Totalt år fel"}
          value={`${data.statistics.yearsOff} år`}
        />
        <StatisticsItem
          title={"Snitt år fel"}
          value={`${data.statistics.averageYearsOff.toFixed(1)} år`}
        />
      </motion.ol>
    </section>
  );
};

const StatisticsItem = ({
  title,
  value,
}: {
  title: string;
  value: string | number;
}) => {
  return (
    <motion.li
      className={twMerge(
        `grid grid-cols-3 py-2 justify-center items-center px-8`,
      )}
      variants={item}
    >
      <span className="text-2xl text-left col-span-2 ">{title}</span>
      <span className="text-2xl text-right">{value}</span>
    </motion.li>
  );
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
