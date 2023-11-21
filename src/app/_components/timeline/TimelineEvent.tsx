import { HistoricEvent } from "@/models/historicEvent";

export const TimelineEvent = ({
  historicEvent,
}: {
  historicEvent: HistoricEvent;
}) => {
  return (
    <article className="text-2xl relative rounded-full border-2 border-black dark:border-white p-4">
      <span>{historicEvent.year}</span>
      <div className="border-l-2 border-black absolute w-1 translate-y-4" />
    </article>
  );
};
