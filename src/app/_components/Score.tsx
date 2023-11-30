import { useAtom } from "jotai";
import { scoreAtom } from "../state";

export const Score = () => {
  const [score] = useAtom(scoreAtom);

  return (
    <article className="text-5xl p-8 absolute top-0 left-0">{score}p</article>
  );
};
