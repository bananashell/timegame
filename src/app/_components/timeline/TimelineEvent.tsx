import { GuessableGameEvent } from "@/gameEngine/gameState";
import { isLockedEvent as _isLockedEvent } from "@/utils/guards/isLockedEvent";

export const TimelineEvent = ({ event }: { event: GuessableGameEvent }) => {
  return (
    <article
      className={`flex flex-col max-w-lg rounded-xl overflow-hidden border-2 px-4 w-44 border-black dark:border-white backdrop-blur-lg bg-white/20 dark:bg-black/20`}
    >
      <span className="text-3xl text-center">
        <span className="">{event.year}</span>
      </span>
      <span className="text-base text-center font-normal break-words line-clamp-2">
        {event.type == "historic" && event.title.sv}
        {event.type == "music" && event.title}
      </span>
    </article>
  );
};

// const colorMapping: { [category in HistoricEvent["category"]]: string } = {
//   sports: "bg-[#091540] text-white",
//   popculture: "bg-[#EC4E20] text-black",
//   science: "bg-[#016FB9] text-white",
//   politics: "bg-[#A01A7D] text-white",
//   technology: "",
//   exploration: "bg-[#FF9505] text-black",
//   culture: "",
//   war: "",
//   history: "",
// };
