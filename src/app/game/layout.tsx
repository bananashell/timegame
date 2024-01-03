import { generateGradient } from "@/app/generateGradient";

const gradient = generateGradient();
export default function GameLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div style={{ background: gradient }}>{children}</div>;
}
