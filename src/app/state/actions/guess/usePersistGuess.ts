import { calculateScore } from "@/gameEngine/logic/calculateScore";
import { useAtom } from "jotai";
import {
  currentEventAtom,
  nextEventAtom,
  rootStateAtom,
  saltAtom,
  stateAtom,
  timelineEventsAtom,
} from "@/app/state";
import { trpc } from "@/app/_trpc/client";

export const usePersistGuess = () => {
  const [salt] = useAtom(saltAtom);
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
        salt,
        pageSize: 1,
        cursor: currentEvent!.id,
      }),
      trpc.upsertGame.mutate({
        name: "username",
        salt,
        score: totalScore,
        userId: "2ea0f401-cf08-4589-89cd-10f66bbc1302",
        gameStatus: state.mainState,
        noQuestions: newTimeline.length,
      }),
    ]);

    const next = res[0];
    setCurrentEvent({ ...next, guess: currentEvent.guess }); // TODO: Use loadable
    setState({ mainState: "playing", subState: "guessing" });
  };
};
