import { generateRandomSalt } from "@/server/service/saltService";
export const startNewGame = () => {
  const salt = generateRandomSalt();
  console.log("new game started:", salt);

  return { salt };
};
