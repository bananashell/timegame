"use client";
import { format } from "date-fns";

export const LastUpdated = ({ date }: { date: Date }) => {
  return (
    <span className="text-center dark:drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.6)] flex flex-col">
      Senast uppdaterad: {format(date, "yyyy-MM-dd HH:mm:ss")}
    </span>
  );
};
