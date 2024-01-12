import { currentEventAtom, surroundingEventsAtom } from "@/app/state";
import { useAtom } from "jotai";
import { useGuess, useLock } from "@/app/state/actions";
import { AnimatePresence, motion } from "framer-motion";
import {
  BackspaceRounded,
  ChevronLeftRounded,
  ChevronRightRounded,
  LockRounded,
  LockOpen,
} from "@mui/icons-material";

export const Guess = () => {
  return (
    <section className="grid-in-guess text-3xl flex flex-col gap-8 items-center self-end">
      <motion.div className="w-full flex flex-col">
        <CurrentEvent />
        <Keypad />
      </motion.div>
    </section>
  );
};

const Keypad = () => {
  const [currentEvent] = useAtom(currentEventAtom);
  const [surroundingEvents] = useAtom(surroundingEventsAtom);

  const updateGuess = useGuess();
  const lockGuess = useLock();
  const value = currentEvent?.guess;

  const backspace = () => {
    updateGuess(value ? Math.floor(value / 10) : 0);
  };
  const addNumber = (numeral: number) => {
    updateGuess(value ? value * 10 + numeral : numeral);
  };
  const handlePrevious = () => {
    const nextValue =
      (surroundingEvents?.eventBefore?.guess &&
        surroundingEvents?.eventBefore?.guess - 1) ||
      value ||
      0;

    updateGuess(nextValue);
  };
  const handleNext = () => {
    const nextValue =
      (surroundingEvents?.eventBefore?.guess &&
        surroundingEvents?.eventBefore?.guess + 1) ||
      value ||
      0;

    updateGuess(nextValue);
  };

  return (
    <article className="w-full bg-white flex items-center justify-center dark:bg-gray-800 border-t border-gray-500">
      <article className="w-full max-w-sm">
        <section className="flex justify-between items-center gap-2">
          <motion.button
            whileTap={{ scale: 0.8 }}
            onClick={handlePrevious}
            className="px-4 py-2 aspect-square"
          >
            <ChevronLeftRounded />
          </motion.button>
          <div>{value || ""}</div>
          <motion.button
            whileTap={{ scale: 0.8 }}
            onClick={handleNext}
            className="px-4 py-2 aspect-square"
          >
            <ChevronRightRounded />
          </motion.button>
        </section>
        <section className="text-xl  grid grid-cols-3 gap-px bg-black border border-t-black dark:border-t-white dark:bg-white">
          {buttons.map((value) => {
            // if (value === "empty") {
            //   return (
            //     <i
            //       key={value}
            //       className="text-center aspect-[2/1] bg-white dark:bg-gray-800"
            //     />
            //   );
            // }

            if (value === "lock") {
              return (
                <motion.button
                  key={value}
                  whileTap={{ scale: 0.9 }}
                  onClick={lockGuess}
                  className="bg-red-500"
                >
                  <LockOpen />
                </motion.button>
              );
            }

            if (value === "backspace") {
              return (
                <motion.button
                  key={value}
                  whileTap={{ scale: 0.9 }}
                  onClick={backspace}
                  className="bg-white dark:bg-gray-800"
                >
                  <BackspaceRounded />
                </motion.button>
              );
            }

            return (
              <motion.button
                key={value}
                whileTap={{ scale: 0.9 }}
                className="text-center aspect-[2/1] bg-white dark:bg-gray-800"
                onClick={() => addNumber(value)}
              >
                {value}
              </motion.button>
            );
          })}
        </section>
      </article>
    </article>
  );
};

const buttons = [
  1,
  2,
  3,
  4,
  5,
  6,
  7,
  8,
  9,
  "lock",
  0,
  // "empty",
  "backspace",
] as const;

const CurrentEvent = () => {
  const [currentEvent] = useAtom(currentEventAtom);

  return (
    <section className="backdrop-blur-xl flex justify-center bg-white/20 dark:bg-black/20 border-black dark:border-white border-t-2 w-full user-select-none">
      <div className="w-full max-w-md p-8 ">
        <h2 className="text-2xl">{currentEvent?.title.sv}</h2>
        <p className="text-base">{currentEvent?.description.sv}</p>
      </div>
    </section>
  );
};
