// // trpc.upsertGame.mutate({
// //     gameStatus: "playing",
// //     username: rootState.username,
// //     noQuestions: 0,
// //     salt: args.salt,
// //     score: 0,
// //     userId: newUserId,
// //   }),
// //   trpc.historicEvents.query({
// //     salt: args.salt,
// //     pageSize: 1,
// //     cursor: undefined,
// //   }),

// import { z } from "zod";
// import { GameEntity, createNewGameEntity } from "../gameEntity";
// import { getGame } from ".";
// import { gameId } from "../gameId";
// import { HistoricEvent } from "@/models/historicEvent";

// export const joinGameInput = z.object({
//   salt: z.string(),
//   userId: z.string().uuid(),
//   username: z.string(),
// });

// export const joinGame = async (
//   input: z.infer<typeof joinGameInput>,
// ): Promise<{ game: GameEntity; nextEvent: HistoricEvent }> => {
//   const { salt, userId, username } = joinGameInput.parse(input);

//   // Check if game already exists, if so return that game.
//   const gameEntity = await getGame(gameId({ salt, userId }));
//   if (gameEntity.exists) {
//     // TODO: Get next historicEvent
//     return { game: gameEntity.data, nextEvent: {} as HistoricEvent };
//   }

//   // If game does not exist, create new game and return that game.
//   const newGameEntity = await createNewGameEntity({ salt, userId, username });
//   return { game: newGameEntity, nextEvent: {} as HistoricEvent };
// };
