import { StartNewGame } from "@/app/StartNewGame";
import Texture from "public/images/Texturelabs_Film_147L.jpg";
import Image from "next/image";
import { generateGradient } from "./generateGradient";

export default async function Home() {
  return (
    <main
      className="flex items-center justify-center h-full w-full"
      style={{ background: generateGradient() }}
    >
      <StartNewGame />
      <Image
        src={Texture}
        quality={20}
        alt="Texture"
        className="absolute top-0 left-0 w-full h-full mix-blend-soft-light pointer-events-none"
      />
    </main>
  );
}
