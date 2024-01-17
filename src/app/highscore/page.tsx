import Link from "next/link";
import { trpc } from "../_trpc/serverClient";
import { Highscore } from "./Highscore";

export const dynamic = "force-dynamic";

const HighscorePage = async () => {
  const highscoreData = await trpc.getHighscore({});
  return (
    <section className="flex w-full gap-4 h-screen justify-center items-center flex-col">
      <Highscore data={highscoreData} />
    </section>
  );
};

export default HighscorePage;
