import Link from "next/link";
import { trpc } from "../_trpc/serverClient";
import { Highscore } from "./Highscore";

export const dynamic = "force-dynamic";

const HighscorePage = async () => {
  const highscores = await trpc.getHighscore({});
  return (
    <section className="flex w-full gap-4 h-screen justify-center items-center flex-col">
      <div>{new Date().toISOString()}</div>
      <Highscore highscores={highscores} />
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
