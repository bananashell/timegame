import { generateGradient } from "@/app/generateGradient";

const gradient = generateGradient();
export default function GameLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-w-screen min-h-screen" style={{ background: gradient }}>
      {children}
    </div>
  );
}
