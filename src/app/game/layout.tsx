import { generateGradient } from "@/app/generateGradient";

const gradient = generateGradient();
export default function GameLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="w-full h-full" style={{ background: gradient }}>
      {children}
    </div>
  );
}
