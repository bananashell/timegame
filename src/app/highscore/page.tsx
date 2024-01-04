import { trpc } from "../_trpc/serverClient";
import { Highscore } from "./Highscore";

const HighscorePage = async () => {
  const highscores = await trpc.getHighscore({});
  return (
    <section className="flex w-full h-screen justify-center items-center flex-col">
      <Highscore highscores={highscores} />
    </section>
  );
};

export default HighscorePage;
