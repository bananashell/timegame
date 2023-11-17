import type { Category } from "@/models/category";

export type HistoricEvent = {
  category: Category;
  year: { year: number; precision: "approxemation" | "precise" };
  description: string;
};
