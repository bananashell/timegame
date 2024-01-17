import Link from "next/link";
import { trpc } from "../_trpc/serverClient";
import { Highscore } from "./Highscore";

// export const dynamic = "force-dynamic";
export const revalidate = 300;

const HighscorePage = async () => {
  const highscoreData = await trpc.getHighscore({});

  return (
    <section className="flex w-full gap-4 h-screen justify-center items-center flex-col">
      <Highscore data={highscoreData} />
      <span>Senast uppdaterad: {new Date().toISOString()}</span>
      <section className="mt-8 text-3xl text-center dark:drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.6)] flex flex-col">
        <Link href="/" className="underline">
          Tillbaka till start
        </Link>
        sp
      </section>
    </section>
  );
};

export default HighscorePage;
