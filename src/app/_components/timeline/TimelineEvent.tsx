import { HistoricEvent } from "@/models/historicEvent";

export const TimelineEvent = ({
  historicEvent,
}: {
  historicEvent: HistoricEvent;
}) => {
  return (
    <article className="flex max-w-lg divide-x rounded border-2 border-black dark:border-white py-4">
      <div className="px-4">
        <h2 className="text-black dark:text-white">{historicEvent.title}</h2>
        <span className="text-gray-800 dark:text-gray-400">
          {historicEvent.description}
        </span>
      </div>
      <div className="text-5xl flex items-center px-8">
        <span>{historicEvent.year}</span>
      </div>
    </article>
  );
};
