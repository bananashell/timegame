import { MovingTimeline } from "@/app/MovingTimeline";
import { StartNewGame } from "@/app/_components/StartNewGame";
import { generateRandomSalt } from "@/server/service/saltService";

export default async function Home() {
  const newSalt = await generateRandomSalt();

  return (
    <main className="flex flex-col justify-center items-center h-full">
      <h1 className="text-[8vw]">Welcome to the Timeline</h1>
      <MovingTimeline />
      <StartNewGame salt={newSalt} />
    </main>
  );
}
