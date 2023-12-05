import { useAtom } from "jotai";
import { stateAtom } from "@/app/state";

export const useLockGuess = () => {
  const [state, setState] = useAtom(stateAtom);

  return async () => {
    if (state.mainState != "playing") {
      throw new Error("Must be playing to be able to lock");
    }

    setState({ mainState: "playing", subState: "displaying correct answer" });
  };
};
