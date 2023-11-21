import Link from "next/link";
import { MovingTimeline } from "./MovingTimeline";

export default function Home() {
  return (
    <main className="flex flex-col justify-center items-center h-full">
      <h1 className="text-[8vw]">Welcome to the Timeline</h1>
      <MovingTimeline />
      <Link href="/game" className="text-[4vw] hover:scale-125 transition-all">
        Start new game
      </Link>
    </main>
  );
}
