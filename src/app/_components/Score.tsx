import { useAtom } from "jotai";
import { currentEventAtom, stateAtom } from "../state";
import { motion, useAnimate } from "framer-motion";
import { usePersistGuess } from "../state/actions/guess/usePersistGuess";
import { timeout } from "@/utils/timeout";
import { useEffect } from "react";

export const Score = () => {
  const persistGuess = usePersistGuess();
  const [currentEvent] = useAtom(currentEventAtom);
  const [state] = useAtom(stateAtom);

  const [questionMarkScope, animateQuestionMark] = useAnimate();
  const [answerScope, animateAnswer] = useAnimate();

  useEffect(() => {
    if (!currentEvent) return;
    if (
      !(
        state.mainState === "playing" &&
        state.subState === "displaying correct answer"
      )
    )
      return;

    const animateIn = async () => {
      await animateQuestionMark([
        [
          questionMarkScope.current,
          {
            opacity: [0, 1],
            y: [100, 0],
          },
          { type: "inertia", stiffness: 100, duration: 1 },
        ],
      ]);

      await animateQuestionMark([
        [
          questionMarkScope.current,
          {
            rotateY: [0, 720, 90],
          },
          { type: "inertia", stiffness: 100, duration: 1 },
        ],
      ]);

      await animateAnswer([
        [
          answerScope.current,
          { rotateY: [90, 0], opacity: [0, 1] },
          { type: "inertia", stiffness: 100, duration: 0.5 },
        ],
      ]);

      await timeout(500);
      await persistGuess();
    };

    animateIn();
  }, [currentEvent, state]);

  if (!currentEvent) return null;

  if (
    state.mainState === "playing" &&
    state.subState === "displaying correct answer"
  ) {
    return (
      <>
        <div className="fixed flex items-center justify-center top-0 left-0 right-0 bottom-0 bg-black/50 z-10">
          <motion.article
            data-correct-guess
            ref={answerScope}
            initial={{ rotateY: 45, opacity: 0 }}
            animate={{}}
            exit={{}}
            className="text-[40vmin] font-bold p-8 absolute"
          >
            {currentEvent.year}
          </motion.article>
          <motion.article
            data-question-mark
            ref={questionMarkScope}
            transition={{ type: "spring", stiffness: 100 }}
            initial={{ opacity: 0, y: 100 }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            exit={{ opacity: 0, scale: 0.5, y: -100 }}
            className="text-[40vmin] font-bold p-8 absolute"
          >
            ?
          </motion.article>
        </div>
      </>
    );
  }

  return null;
};
