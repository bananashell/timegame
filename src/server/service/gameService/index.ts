import { generateRandomSalt } from "@/server/service/saltService";
export const startNewGame = () => {
  const salt = generateRandomSalt();

  return { salt };
};
