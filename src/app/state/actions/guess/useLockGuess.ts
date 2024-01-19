import { useAtom } from "jotai";
import { stateAtom, currentEventAtom } from "@/app/state";

export const useLockGuess = () => {
  const [state, setState] = useAtom(stateAtom);
  const [currentEvent] = useAtom(currentEventAtom);

  return async () => {
    if (state.mainState != "playing") {
      throw new Error("Must be playing to be able to lock");
    }

    if (!currentEvent?.guess) {
      return;
    }

    setState({ mainState: "playing", subState: "displaying correct answer" });
  };
};
