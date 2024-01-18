import { historicEvents } from "@/data/historicEvents";
import { twMerge } from "tailwind-merge";

export default async function AllEventsPage() {
  if (process.env.NODE_ENV !== "development") return null;

  return (
    <section className="text-white container mx-auto">
      <h1>Event data</h1>
      <h2>{historicEvents.length} events</h2>

      <div className="text-lg font-mono capitalize">
        <article className="flex flex-wrap gap-8 whitespace-nowrap text-left">
          <table>
            <thead>
              <tr>
                <th className="pr-8">Id</th>
                <th className="pr-8">Year</th>
                <th className="pr-8">Title</th>
                <th className="pr-8">Description</th>
              </tr>
            </thead>
            <tbody>
              {historicEvents
                .sort((a, b) => a.year - b.year)
                .map((event, index) => (
                  <tr
                    key={index}
                    className={twMerge(index % 2 && "bg-gray-600")}
                  >
                    <td className="py-1 pr-8">{event.id}</td>
                    <td className="py-1 pr-8">{event.year}</td>
                    <td className="py-1 pr-8">{event.title.sv}</td>
                    <td className="py-1 pr-8">{event.description.sv}</td>
                  </tr>
                ))}
            </tbody>
          </table>
        </article>
      </div>
    </section>
  );
}
