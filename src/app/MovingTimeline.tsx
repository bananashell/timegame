import { HistoricEvent } from "@/models/historicEvent";
import { TimelineEvent } from "./_components/timeline/TimelineEvent";

// TODO: make it move
export const MovingTimeline = () => {
  return (
    <section className="flex justify-evenly w-full">
      {randomEvents.map((x) => (
        <TimelineEvent key={x.id} historicEvent={x} />
      ))}
    </section>
  );
};

const generateNewRandomTimelineEvent = (): HistoricEvent => {
  return {
    id: "asd",
    title: "asd",
    category: "culture",
    description: "",
    year: getRandomYearInRange(1400, currentYear),
  };
};

function getRandomYearInRange(minYear: number, maxYear: number): number {
  return Math.floor(Math.random() * (maxYear - minYear + 1)) + minYear;
}
const currentYear = new Date().getFullYear();

const randomEvents = Array.from({ length: 15 }, () =>
  generateNewRandomTimelineEvent(),
);
