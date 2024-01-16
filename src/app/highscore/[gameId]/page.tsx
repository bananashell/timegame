import { trpc } from "@/app/_trpc/serverClient";
import { Highscore } from "../Highscore";
import Link from "next/link";
import superjson from "superjson";

const HighscorePage = async ({
  params: { gameId },
}: {
  params: { gameId: string };
}) => {
  gameId = decodeURIComponent(gameId || "");
  const highscores = await trpc.getHighscore({ gameId });
  console.log("highscores", highscores);

  return (
    <section className="flex w-full gap-4 h-screen justify-center items-center flex-col">
      <Highscore gameId={gameId} highscores={highscores} />
      <Link
        href={"/"}
        className="text-xl bg-white dark:bg-gray-800 hover:bg-gray-100 transition-colors hover:dark:bg-gray-700 px-8 py-4 rounded drop-shadow-lg"
      >
        Nytt spel
      </Link>
    </section>
  );
};

export default HighscorePage;
