import { HistoricGameEvent } from "@/gameEngine/gameState";
import { HistoricEvent, historicEvent } from "@/models/historicEvent";
import { isLockedEvent as _isLockedEvent } from "@/utils/guards/isLockedEvent";
import { twMerge } from "tailwind-merge";

export const TimelineEvent = ({
  historicEvent,
}: {
  historicEvent: HistoricGameEvent;
}) => {
  return (
    <article
      className={`flex max-w-lg rounded-xl border-2 border-black dark:border-white`}
    >
      <div className="px-4">
        <h2 className="text-black dark:text-white">{historicEvent.title}</h2>
        <span className="text-gray-800 dark:text-gray-400">
          {historicEvent.description}
        </span>
      </div>
      <div className="text-5xl flex items-center p-2 aspect-square w-40 ">
        <div
          className={twMerge(
            "w-full h-full rounded-xl flex justify-center items-center",
          )}
        >
          <div className="px-2">{historicEvent.year}</div>
        </div>
      </div>
    </article>
  );
};

const colorMapping: { [category in HistoricEvent["category"]]: string } = {
  sport: "bg-[#091540] text-white",
  popculture: "bg-[#EC4E20] text-black",
  science: "bg-[#016FB9] text-white",
  politics: "bg-[#A01A7D] text-white",
  technology: "",
  exploration: "bg-[#FF9505] text-black",
  culture: "",
  war: "",
  history: "",
};
