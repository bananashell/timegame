import { generateGradient } from "@/app/generateGradient";

const gradient = generateGradient();
export default function GameLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="h-full w-full" style={{ background: gradient }}>
      {children}
    </div>
  );
}
