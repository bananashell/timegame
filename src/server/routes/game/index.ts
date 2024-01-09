import { startNewGame } from "./startNewGame";
import { makeGuess } from "./makeGuess";
import { getHighscore } from "./getHighscore";
import { getGame } from "./getGame";
import { test } from "./test";

export const gameRouter = {
  startNewGame,
  getGame,
  makeGuess,
  getHighscore,
  test,
};
