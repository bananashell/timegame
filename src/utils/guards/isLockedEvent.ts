import { LockedGameEvent } from "@/gameEngine/gameState";

export const isLockedEvent = (
  item: unknown | undefined,
): item is LockedGameEvent => {
  return (
    typeof item === "object" && !!item && "guess" in item && "score" in item
  );
};
