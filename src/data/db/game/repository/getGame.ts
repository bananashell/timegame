import { DocumentReference } from "firebase-admin/firestore";
import { GameEntity } from "../gameEntity";
import { gamesCollection } from "./gamesCollection";
import { GameId } from "../gameId";

type NonExistingGame = { exists: false; id: string };
type ExistingGame = {
  exists: true;
  id: string;
  data: GameEntity;
  ref: DocumentReference<GameEntity>;
};

export const getGame = async (
  gameId: GameId,
): Promise<NonExistingGame | ExistingGame> => {
  const collection = await gamesCollection();
  const gameSnap = await collection.doc(gameId.toString()).get();

  const data = gameSnap.data();
  if (!gameSnap.exists || !data) {
    return {
      exists: false,
      id: gameSnap.ref.id,
    };
  }

  return {
    exists: true,
    data: data,
    id: gameSnap.ref.id,
    ref: gameSnap.ref,
  };
};
