import { GameBoard } from "./GameBoard";
import { GameClientInitiator } from "./gameClientInitiator";

type Props = {
  salt: string;
};

export default async function Game({ params: { salt } }: { params: Props }) {
  return (
    <div className="">
      <GameClientInitiator salt={salt} />
      <GameBoard />
    </div>
  );
}
