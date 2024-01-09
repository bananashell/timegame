import { GameBoard } from "./GameBoard";
import { GameClientInitiator } from "./gameClientInitiator";

type Props = {
  salt: string;
};

export default async function Game({ params: { salt } }: { params: Props }) {
  return (
    <>
      <GameClientInitiator salt={salt} />
      <GameBoard />
    </>
  );
}
