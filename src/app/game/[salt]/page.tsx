import { GameBoard } from "./GameBoard";

type Props = {
  salt: string;
};

export default async function Game({ params: { salt } }: { params: Props }) {
  return (
    <>
      <GameBoard />
    </>
  );
}
