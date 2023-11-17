import { HistoricEvent } from "@/models/historicEvent";

export function HistoricEventCard({
  historicEvent,
}: {
  historicEvent: HistoricEvent;
}) {
  return (
    <article className="border border-white">
      <header>{historicEvent.category}</header>
      <main>{historicEvent.description}</main>
      <footer>{historicEvent.year.year}</footer>
    </article>
  );
}
