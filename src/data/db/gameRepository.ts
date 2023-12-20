import { getFirestore } from "firebase-admin/firestore";
import { z } from "zod";
import { initAdmin } from "./firebaseAdmin";

export const GameInput = z.object({
  userId: z.string().uuid(),
  salt: z.string(),
  score: z.number().min(0).max(1000000),
  name: z.string().min(1).max(255),
  gameStatus: z.enum(["playing", "game over"]),
  noQuestions: z.number().min(0).max(1000000),
});
export type Game = z.infer<typeof GameInput>;

export const FindGamesInput = z.object({
  salt: z.string(),
});

type GameId = string;

const gamesCollection = async () => {
  await initAdmin();
  const firestore = getFirestore();
  return firestore.collection("games");
};

const gameId = ({ userId, salt }: { userId: string; salt: string }): GameId => {
  if (!userId) throw new Error("userId is not defined");
  if (!salt) throw new Error("salt is not defined");

  return `${userId}|${salt}`;
};

export const upsertGame = async (game: Game) => {
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
};

export const getGame = async (gameId: GameId) => {
  const collection = await gamesCollection();
  const gameSnap = await collection.doc(gameId).get();

  return {
    exists: gameSnap.exists,
    data: gameSnap.data() as Game,
    ref: gameSnap.ref,
  };
};

export const findGames = async ({ salt }: { salt: string }) => {
  const collection = await gamesCollection();
  const data = await collection.where("salt", "==", salt).get();

  return data.docs.map((doc) => doc.data() as Game);
};
