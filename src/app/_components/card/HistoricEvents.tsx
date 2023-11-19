"use client";
import { trpc } from "@/app/_trpc/client";
import { HistoricEventCard } from ".";

export const HistoricEvents = () => {
  const { data, refetch, isLoading, isFetching, isSuccess } =
    trpc.historicEvent.useQuery(undefined, {
      trpc: { ssr: false },
      suspense: false,
    });

  return (
    <div>
      <button onClick={() => refetch()}>Reload</button>
      {isSuccess && <HistoricEventCard historicEvent={data} />}
      {isFetching && <span>LOADING!!!</span>}
    </div>
  );
};
