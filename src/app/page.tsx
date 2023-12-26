import { StartNewGame } from "@/app/StartNewGame";
import Texture from "public/images/Texturelabs_Film_147L.jpg";
import Image from "next/image";

export default async function Home() {
  return (
    <main
      className="flex items-center justify-center h-full w-full"
      style={{ background: generateGradient() }}
    >
      <StartNewGame />
      <Image
        src={Texture}
        alt="Texture"
        objectFit="cover"
        objectPosition="center"
        className="absolute top-0 left-0 w-full h-full mix-blend-soft-light pointer-events-none"
      />
    </main>
  );
}

const generateGradient = () => {
  const colors = ["#F7F2D7", "#94E8D5"];
  const stopSize = 2;
  const colorArray = [];
  for (let i = 0; i < 100; i += stopSize) {
    const color = colors.at(colorArray.length % colors.length);
    colorArray.push(`${color} 0 ${i * 2}%`);
  }

  const output = `conic-gradient(${colorArray.join(", ")})`;
  return output;
};
