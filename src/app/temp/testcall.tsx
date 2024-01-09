"use client";

import { trpc } from "../_trpc/client";

export const TestCall = () => {
  const { data, refetch } = trpc.test.useQuery();
  return (
    <div>
      TestCall <button onClick={() => refetch()}>Refetch</button>
    </div>
  );
};
