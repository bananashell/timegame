import { LockedHistoricGameEvent } from "@/gameEngine/gameState";

export const isLockedEvent = (
  item: unknown | undefined,
): item is LockedHistoricGameEvent => {
  return (
    typeof item === "object" && !!item && "guess" in item && "score" in item
  );
};
