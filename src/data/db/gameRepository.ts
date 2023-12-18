import { addDoc, getDoc, doc, updateDoc, setDoc } from "firebase/firestore";
import { gamesCollection } from "./firestore";
import { z } from "zod";

export const GameInput = z.object({
  userId: z.string().uuid(),
  salt: z.string(),
  score: z.number().min(0).max(1000000),
  name: z.string().min(1).max(255),
  gameStatus: z.enum(["playing", "game over"]),
  noQuestions: z.number().min(0).max(1000000),
});

export type Game = z.infer<typeof GameInput>;

type GameId = string;

const gameId = ({ userId, salt }: { userId: string; salt: string }): GameId => {
  if (!userId) throw new Error("userId is not defined");
  if (!salt) throw new Error("salt is not defined");

  return `${userId}|${salt}`;
};

export const upsertGame = async (game: Game) => {
  const docRef = doc(gamesCollection, gameId(game));
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    await updateDoc(docRef, game);
    console.log("Document updated with ID: ", docRef.id);
    return;
  }

  await setDoc(docRef, game);

  console.log("Document written with ID: ", docRef.id);
  return;
};

export const getGame = async (gameId: GameId) => {
  const docRef = doc(gamesCollection, gameId);
  const docSnap = await getDoc(docRef);

  if (!docSnap.exists()) {
    throw new Error(`Game ${gameId} does not exist`);
  }

  return docSnap.data();
};
