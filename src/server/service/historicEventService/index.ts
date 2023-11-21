import { HistoricEvent, historicEvent } from "@/models/historicEvent";
import { data } from "@/data/historicEvents.json";
import { randomizeArrayWithSalt } from "@/utils/array/randomizeArrayWithSalt";

const allData = data.map((event) =>
  historicEvent.parse({ ...event, id: crypto.randomUUID() }),
);

export const getHistoricEvents = async ({
  pageSize,
  cursor,
  salt,
}: {
  salt: string;
  pageSize: number;
  cursor?: string;
}): Promise<HistoricEvent[]> => {
  const randomizedData = randomizeArrayWithSalt(allData, salt);

  if (!cursor) {
    return randomizedData.slice(0, pageSize);
  }

  const cursorIndex = randomizedData.findIndex((event) => event.id === cursor);
  if (cursorIndex === -1 || cursorIndex === randomizedData.length - 1) {
    return [];
  }

  return randomizedData.slice(cursorIndex + 1, cursorIndex + 1 + pageSize);
};
