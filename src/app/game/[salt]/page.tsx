import { trpc } from "@/app/_trpc/serverClient";
import { GameBoard } from "./GameBoard";
import { GameClientInitiator } from "./gameClientInitiator";

type Props = {
  salt: string;
};

export default async function Game({ params: { salt } }: { params: Props }) {
  const gameEntity = await trpc.getGame({ salt });
  console.log("gameEntity", gameEntity);

  return (
    <div className="">
      <GameClientInitiator salt={salt} />
      <GameBoard />
    </div>
  );
}
