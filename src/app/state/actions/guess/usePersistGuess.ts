import { useAtom } from "jotai";
import {
  currentEventAtom,
  nextEventAtom,
  rootStateAtom,
  stateAtom,
  timelineEventsAtom,
} from "@/app/state";
import { trpc } from "@/app/_trpc/client";

export const usePersistGuess = () => {
  const [timelineEvents, setTimelineEvents] = useAtom(timelineEventsAtom);
  const [currentEvent, setCurrentEvent] = useAtom(currentEventAtom);
  const [_nextEvent, setNextEvent] = useAtom(nextEventAtom);
  const [state, setState] = useAtom(stateAtom);
  const [gameState] = useAtom(rootStateAtom);

  return async () => {
    const isDisplayingCorrectAnswer =
      state.mainState == "playing" &&
      state.subState == "displaying correct answer";

    if (!isDisplayingCorrectAnswer)
      throw new Error("Must be displaying score to move forward");

    if (!currentEvent) throw new Error("Current event is not defined");

    const { gameState: newGameState, nextEvent } = await trpc.makeGuess.mutate({
      guess: {
        guess: currentEvent.guess,
        questionId: currentEvent.id,
      },
      salt: gameState.salt,
      userId: gameState.userId,
    });

    if (newGameState.gameStatus === "game over") {
      setState({ mainState: "game over", subState: "score screen" });
      return;
    }

    setTimelineEvents(newGameState.events);
    setCurrentEvent({ ...nextEvent, guess: currentEvent.guess });
    setState({ mainState: "playing", subState: "guessing" });
  };
};
