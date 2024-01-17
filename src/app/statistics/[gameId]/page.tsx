import { trpc } from "@/app/_trpc/serverClient";
import { Statistics } from "./Statistics";
import Link from "next/link";

export const dynamic = "force-dynamic";

const StatisticsPage = async ({
  params: { gameId },
}: {
  params: { gameId: string };
}) => {
  gameId = decodeURIComponent(gameId || "");
  const data = await trpc.getStatistics({ gameId });

  return (
    <section className="flex w-full gap-4 h-screen justify-center items-center flex-col">
      <Statistics data={data} />
      <section className="mt-8 text-3xl text-center dark:drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.6)] flex flex-col gap-8">
        <Link href={`/highscore/${gameId}`} className="underline">
          Veckans topplista
        </Link>
      </section>
    </section>
  );
};

export default StatisticsPage;
