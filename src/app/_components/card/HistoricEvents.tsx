"use client";
import { trpc } from "@/app/_trpc/client";
import { HistoricEventCard } from ".";

export const HistoricEvents = () => {
  const { data, refetch, isLoading, isFetching, isSuccess } =
    trpc.historicEvents.useQuery(
      { pageSize: 10, salt: "salt" },
      {
        trpc: { ssr: false },
        suspense: false,
      },
    );

  return (
    <div>
      <button onClick={() => refetch()}>Reload</button>

      {isSuccess &&
        data.map((event) => (
          <HistoricEventCard historicEvent={event} key={event.id} />
        ))}
      {isFetching && <span>LOADING!!!</span>}
    </div>
  );
};
