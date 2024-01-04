import { trpc } from "@/app/_trpc/serverClient";

const HighscorePage = async ({
  params: { salt },
}: {
  params: { salt: string };
}) => {
  const games = await trpc.getHighscore({ salt });
  return (
    <ol>
      <h1>Highscore</h1>
      {games.map((game) => (
        <li key={game.userId + game.salt}>
          {game.username} {game.totalScore} {game.noEvents}
        </li>
      ))}
    </ol>
  );
};

export default HighscorePage;
