import { HistoricEvent } from "@/models/historicEvent";

export const validateOrder = (timeline: HistoricEvent[]) => {
  if (timeline.length === 0 || timeline.length === 1) {
    return true;
  }

  for (let i = 0; i < timeline.length; i++) {
    const curr = timeline[i];
    const next = timeline?.[i + 1];

    if (!next) {
      continue;
    }

    if (curr.year > next.year) {
      return false;
    }
  }

  return true;
};
