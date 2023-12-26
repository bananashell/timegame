export type GameId = string;

export const gameId = ({
  userId,
  salt,
}: {
  userId: string;
  salt: string;
}): GameId => {
  if (!userId) throw new Error("userId is not defined");
  if (!salt) throw new Error("salt is not defined");

  return `${userId}|${salt}`;
};
