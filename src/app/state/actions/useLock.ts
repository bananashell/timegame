import { trpc } from "@/app/_trpc/client";
import { calculateScore } from "@/gameEngine/logic/calculateScore";
import { useAtom } from "jotai";
import {
  gameStateAtom,
  stateAtom,
  saltAtom,
  timelineEventsAtom,
  currentEventAtom,
} from "..";
import { useRouter } from "next/navigation";

export const useLock = () => {
  const router = useRouter();
  const [gameState] = useAtom(gameStateAtom);
  const [state, setState] = useAtom(stateAtom);
  const [salt] = useAtom(saltAtom);
  const [timelineEvents, setTimelineEvents] = useAtom(timelineEventsAtom);
  const [currentEvent, setCurrentEvent] = useAtom(currentEventAtom);

  return async () => {
    if (state != "playing") {
      throw new Error("Must be playing to be able to lock");
    }

    const score = calculateScore(gameState);
    if (score === false) {
      // GAME END
      console.warn("GAME OVER");
      setState("game over");
      return;
    }

    const newTimeline = [...timelineEvents, { ...currentEvent!, score: score }];

    setTimelineEvents(newTimeline);

    const res = await trpc.historicEvents.query({
      salt,
      pageSize: 1,
      cursor: currentEvent!.id,
    });

    const next = res[0];
    setCurrentEvent({ ...next, guess: 1900 });
  };
};
