import { trpc } from "../_trpc/serverClient";
import { TestCall } from "./testcall";

const TempPage = async () => {
  // const highscores = await trpc.getHighscore({ salt: "2285cbedd67997e0" });

  const result = await trpc.test.fetch();

  // console.log(highscores);
  return (
    <div>
      <TestCall />
      {result.userId}
    </div>
  );
  // return (
  //   <ul>
  //     {highscores.map((x) => (
  //       <li key={x.userId + x.salt}>{JSON.stringify(x)}</li>
  //     ))}
  //   </ul>
  // );
};

export default TempPage;
