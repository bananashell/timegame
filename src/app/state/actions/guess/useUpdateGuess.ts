import { Year } from "@/gameEngine/gameState";
import { useAtom } from "jotai";
import { stateAtom, currentEventAtom } from "../..";

export const useUpdateGuess = () => {
  const currentYear = new Date().getFullYear();
  const [state] = useAtom(stateAtom);
  const [currentEvent, setCurrentEvent] = useAtom(currentEventAtom);

  return (year: Year) => {
    if (state.mainState != "playing") {
      throw new Error("Must be playing to be able to guess");
    }

    if (!currentEvent) {
      throw new Error("No current event to add guess to");
    }

    setCurrentEvent({ ...currentEvent, guess: Math.min(year, currentYear) });
  };
};
