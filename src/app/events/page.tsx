import { historicEvents } from "@/data/historicEvents";
import { Category } from "@/models/historicEvent";

export default async function EventsPage() {
  if (process.env.NODE_ENV !== "development") return null;

  // count the number of events by category
  const eventCategories: { [category in Category]?: number } = {};
  historicEvents.forEach((event) => {
    if (
      event.category in eventCategories &&
      typeof eventCategories[event.category] == "number"
    ) {
      eventCategories[event.category] = eventCategories[event.category]! + 1;
    } else {
      eventCategories[event.category] = 1;
    }
  });

  // count events by hundred years
  const eventYears: { [year: number]: number } = {};
  historicEvents.forEach((event) => {
    const year = Math.floor(event.year / 100) * 100;
    if (year in eventYears && typeof eventYears[year] == "number") {
      eventYears[year] = eventYears[year]! + 1;
    } else {
      eventYears[year] = 1;
    }
  });

  return (
    <section className="text-white container mx-auto">
      <h1>Event data</h1>
      <h2>{historicEvents.length} events</h2>

      <div className="text-lg font-mono capitalize">
        <article className="flex flex-wrap gap-8">
          <Table
            title="Events by category"
            data={Object.keys(eventCategories)
              .sort((a, b) => a.localeCompare(b))
              .map((x) => ({
                key: x,
                value: eventCategories[x as Category] ?? 0,
              }))}
          />
          <Table
            title="Events by year"
            data={Object.keys(eventYears)
              .sort((a, b) => +a - +b)
              .map((x) => ({
                key: x,
                value: eventYears[+x] ?? 0,
              }))}
          />
        </article>
      </div>
    </section>
  );
}

const Table = ({
  title,
  data,
}: {
  title: string;
  data: { key: string; value: number | string }[];
}) => {
  return (
    <article>
      <h2>{title}</h2>
      <table>
        <tbody>
          {data.map((x) => (
            <tr key={x.key}>
              <td className="pr-4">{x.key}</td>
              <td>{x.value}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </article>
  );
};
