"use client";

import { asyncHighscoresAtom } from "@/app/state/actions/highscore";
import { useAtom } from "jotai";

export const HighScore = () => {
  const [highscore] = useAtom(asyncHighscoresAtom);

  return (
    <div className="flex flex-col gap-8 items-center text-white">
      <section className="flex flex-col gap-8">
        <h2 className="text-6xl">High score</h2>
        <h1 className="text-8xl flex flex-col text-center">
          {highscore.state == "loading" && <span>Loading...</span>}
          {highscore.state == "hasError" && (
            <span>Unable to show highscore</span>
          )}
          {highscore.state == "hasData" && (
            <ol>
              {highscore.data.map((score) => (
                <li key={score.userId + score.salt}>
                  <span>{score.username}</span>
                  <span>{score.totalScore}p</span>
                  <span>#{score.noEvents}</span>
                </li>
              ))}
            </ol>
          )}
        </h1>
      </section>
    </div>
  );
};
