import { GameEntity } from "../gameEntity";
import { gameId } from "../gameId";
import { gamesCollection } from "./gamesCollection";
import { getGame } from "./getGame";

export async function upsertGame(game: GameEntity) {
  const id = gameId(game);
  const gameSnap = await getGame(id);

  if (gameSnap.exists) {
    await gameSnap.ref.update(game);
    console.log("Document updated with ID: ", gameSnap.ref.id);
    return;
  }
  const collection = await gamesCollection();
  await collection.doc(id).create(game);

  console.log("Document written with ID: ", gameId);
  return;
}
