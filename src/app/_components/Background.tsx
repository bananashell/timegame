"use client";
import { useLayoutEffect, useRef } from "react";

export const Background = () => {
  const ref = useRef<HTMLCanvasElement>(null);

  useLayoutEffect(() => {
    draw();
  }, []);

  const draw = () => {
    if (!ref.current) return;
    const canvas = ref.current;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const width = canvas.width;
    const height = canvas.height;

    const colors = ["#F7F2D7", "#94E8D5"];
    const stopSize = 2;
    const colorArray = [];
    for (let i = 0; i < 100; i += stopSize) {
      const color = colors.at(colorArray.length % colors.length);
      colorArray.push(`${color} 0 ${i * 2}%`);
    }

    const gradient = ctx.createConicGradient(0, width / 2, height / 2);
    // gradient.addColorStop(0, "#F7F2D7");
    // gradient.addColorStop(1, "#94E8D5");
    gradient.addColorStop(0, "red");
    gradient.addColorStop(0.1, "red");
    gradient.addColorStop(0.1, "green");
    gradient.addColorStop(0.2, "green");
    gradient.addColorStop(0.2, "yellow");
    gradient.addColorStop(0.3, "blue");
    gradient.addColorStop(0.4, "orange");

    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, width, height);
  };

  return <canvas ref={ref} className="w-full h-full"></canvas>;
};
