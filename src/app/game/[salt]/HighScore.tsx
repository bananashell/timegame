"use client";

import { saltAtom } from "@/app/state";
import { useAtom } from "jotai";

export const HighScore = () => {
  const [salt] = useAtom(saltAtom);

  return (
    <div className="flex flex-col gap-8 items-center text-white">
      <section className="flex flex-col gap-8">
        <h2 className="text-6xl">High score</h2>
        <h1 className="text-8xl flex flex-col text-center">
          <small className="text-3xl">Salt</small>
          <span>{salt}</span>
        </h1>
      </section>
    </div>
  );
};
