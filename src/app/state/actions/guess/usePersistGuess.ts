import { calculateScore } from "@/gameEngine/logic/calculateScore";
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

    const score = calculateScore(gameState);
    if (score === false) {
      // GAME END
      console.warn("GAME OVER");
      setState({ mainState: "game over", subState: "score screen" });
      return;
    }
    const newTimeline = [...timelineEvents, { ...currentEvent!, score: score }];

    setTimelineEvents(newTimeline);
    const totalScore = newTimeline.reduce((acc, curr) => acc + curr.score, 0);

    const [res, _] = await Promise.all([
      trpc.historicEvents.query({
        salt: gameState.salt,
        pageSize: 1,
        cursor: currentEvent!.id,
      }),
      trpc.upsertGame.mutate({
        username: gameState.username,
        salt: gameState.salt,
        score: totalScore,
        userId: gameState.userId,
        gameStatus: state.mainState,
        noQuestions: newTimeline.length,
      }),
    ]);

    const next = res[0];
    setCurrentEvent({ ...next, guess: currentEvent.guess }); // TODO: Use loadable
    setState({ mainState: "playing", subState: "guessing" });
  };
};
