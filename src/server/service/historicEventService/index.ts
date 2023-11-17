import { HistoricEvent } from "@/models/historicEvent";
import { timeout } from "@/utils/timeout";

export const getHistoricEvents = async (): Promise<HistoricEvent[]> => {
  await timeout(500);
  return [
    {
      category: "sport",
      description: "Olympic games are held in Stockholm",
      year: { year: 1912, precision: "precise" },
    },
    {
      category: "popculture",
      description: "Twitter is launched",
      year: { year: 2006, precision: "precise" },
    },
  ];
};

export const getNextHistoricEvent = async (): Promise<HistoricEvent> => {
  await timeout(500);
  return {
    category: "historicEvent",
    description: "Random",
    year: { year: Math.random(), precision: "precise" },
  };
};
