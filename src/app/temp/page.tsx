import { ReactNode } from "react";
import { twMerge } from "tailwind-merge";
import Texture from "public/images/Texturelabs_Film_147L.jpg";
import Image from "next/image";

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

const TempPage = () => {
  return (
    <section
      className="flex items-center justify-center h-full w-full"
      style={{ background: generateGradient() }}
    >
      <header className="relative p-8 rounded-full aspect-square justify-center flex flex-col items-center border-8 border-[#dedac2] bg-[#85d1c0] text-white">
        <h2 className="uppercase">Welcome to the</h2>
        <StrokeHeader>Timeline</StrokeHeader>
      </header>
      <Image
        src={Texture}
        alt="Texture"
        objectFit="cover"
        objectPosition="center"
        className="absolute top-0 left-0 w-full h-full mix-blend-soft-light"
      />
    </section>
  );
};

export default TempPage;

const StrokeHeader = ({
  children,
  backdropColor,
  textColor,
}: {
  children: ReactNode;
  backdropColor?: string;
  textColor?: string;
}) => {
  return (
    <div className="relative font-50s text-xs">
      <h1
        className={twMerge(
          "text-zinc-600 translate-x-1 translate-y-1 absolute top-0 left-0 font-50s",
          backdropColor,
        )}
      >
        {children}
      </h1>
      <h1
        className={twMerge(
          "text-neutral-100 absolute top-0 left-0 font-50s",
          textColor,
        )}
      >
        {children}
      </h1>
      <h1 className="text-transparent">{children}</h1>
    </div>
  );
};
