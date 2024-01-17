import { trpc } from "@/app/_trpc/serverClient";
import { Highscore } from "../Highscore";
import Link from "next/link";

const HighscorePage = async ({
  params: { gameId },
}: {
  params: { gameId: string };
}) => {
  gameId = decodeURIComponent(gameId || "");
  const highscoreData = await trpc.getHighscore({ gameId });

  return (
    <section className="flex w-full gap-4 h-screen justify-center items-center flex-col">
      <Highscore gameId={gameId} data={highscoreData} />
      <section className="mt-8 text-3xl text-center dark:drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.6)] flex flex-col">
        <Link className="underline" href={`/statistics/${gameId}`}>
          Se din statistik
        </Link>
        <Link href="/" className="underline">
          Tillbaka till start
        </Link>
      </section>
    </section>
  );
};

export default HighscorePage;
