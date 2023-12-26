import { CollectionReference, getFirestore } from "firebase-admin/firestore";
import { initAdmin } from "../../firebaseAdmin";
import { GameEntity } from "../gameEntity";

export const gamesCollection = async () => {
  await initAdmin();
  const firestore = getFirestore();
  return firestore.collection("games") as CollectionReference<GameEntity>;
};
