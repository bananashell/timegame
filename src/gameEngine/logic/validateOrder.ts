import { RootState } from "@/gameEngine/gameState";

export const validateOrder = (gameState: RootState) => {
  if (
    gameState.timelineEvents.length === 0 ||
    gameState.timelineEvents.length === 1
  ) {
    return true;
  }

  for (let i = 0; i < gameState.timelineEvents.length; i++) {
    const curr = gameState.timelineEvents[i];
    const next = gameState.timelineEvents?.[i + 1];

    if (!next) {
      continue;
    }

    if (curr.year > next.year) {
      return false;
    }
  }

  return true;
};
