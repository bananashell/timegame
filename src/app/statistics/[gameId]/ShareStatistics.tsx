"use client";

import { trpc } from "@/app/_trpc/serverClient";
import { Share } from "@mui/icons-material";
import { motion } from "framer-motion";

export const ShareStatistics = ({
  data,
}: {
  data: Awaited<ReturnType<typeof trpc.getStatistics>>;
}) => {
  const handleClick = async () => {
    const title = "Jag fick " + data.statistics.score + " poäng";
    const text = `${title}

    🕰️ ${data.statistics.noEvents} händelser
    🎯 ${data.statistics.noCorrectGuesses} fullpottar
    📅 ${data.statistics.yearsOff} år fel
    📅 ${data.statistics.averageYearsOff.toFixed(1)} år snitt fel

    Kan du slå mig?
    `;

    if (typeof navigator.share !== "undefined") {
      await navigator.share({
        url: window.location.protocol + "//" + window.location.host,
        title: title,
        text: text,
      });
    } else {
      await navigator.clipboard.write([
        new ClipboardItem({
          "text/plain": new Blob([`${text}`], {
            type: "text/plain",
          }),
        }),
      ]);
      alert("Länken är kopierad till urklipp!");
    }
  };

  return (
    <motion.button
      onClick={handleClick}
      whileTap={{ scale: 0.9 }}
      className="bg-white dark:bg-gray-800 rounded-xl px-6 py-3 flex gap-2"
    >
      <Share />
      Dela
    </motion.button>
  );
};
