import { currentEventAtom } from "@/app/state";
import { useAtom } from "jotai";
import { useGuess, useLock } from "@/app/state/actions";

export const Guess = () => {
  const lockGuess = useLock();
  const [currentEvent] = useAtom(currentEventAtom);

  const guess = useGuess();

  return (
    <section className="grid-in-guess text-3xl flex flex-col gap-8 items-center">
      {/* <h1 className="text-center">{currentEvent?.guess ?? ""}</h1> */}
      <input
        type="number"
        pattern="[0-9]*"
        inputMode="numeric"
        className="bg-transparent caret-black dark:caret-white text-center text-7xl w-full ring-0 focus:ring-0 focus:outline-none"
        value={currentEvent?.guess ?? ""}
        onChange={(e) => {
          if (!("value" in e.target)) throw new Error("No value in target");
          if (typeof e.target.value !== "string")
            throw new Error("Invalid type");

          guess(+e.target.value);
        }}
      />

      <button
        onClick={() => lockGuess()}
        className="bg-white py-2 rounded px-4 text-black"
      >
        Guess
      </button>
    </section>
  );
};
