import { GameClientInitiator } from "./gameClientInitiator";

type Props = {
  salt: string;
};

export default async function Game({ params: { salt } }: { params: Props }) {
  return (
    <div className="text-white">
      <GameClientInitiator salt={salt} />
    </div>
  );
}
