import { HistoricEvent, historicEvent } from "@/models/historicEvent";
import { data } from "@/data/historicEvents.json";
import { randomizeArrayWithSalt } from "@/utils/array/randomizeArrayWithSalt";

const allData = data.map((event) => historicEvent.parse({ ...event }));

const PAGE_SIZE = 1 as const;

export const getNextHistoricEvent = async ({
  cursor,
  salt,
}: {
  salt: string;
  cursor: string | undefined | null;
}): Promise<HistoricEvent> => {
  const randomizedData = randomizeArrayWithSalt(allData, salt);

  if (!cursor) {
    return randomizedData.slice(0, PAGE_SIZE)[0];
  }

  const cursorIndex = randomizedData.findIndex((event) => event.id === cursor);
  if (cursorIndex === -1 || cursorIndex === randomizedData.length - 1) {
    throw new Error("Unable to find cursor");
  }

  const data = randomizedData.slice(
    cursorIndex + 1,
    cursorIndex + 1 + PAGE_SIZE,
  );

  return data[0];
};
