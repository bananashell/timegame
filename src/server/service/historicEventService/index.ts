import { HistoricEvent } from "@/data/historicEvents/historicEvent";
import { historicEvents } from "@/data/historicEvents/historicEvents";
import { randomizeArrayWithSalt } from "@/utils/array/randomizeArrayWithSalt";

const PAGE_SIZE = 1 as const;

/**
 * Retrieves the next historic event based on the provided cursor and salt.
 * If no cursor is provided, the first event will be returned.
 * @param {Object} options - The options for retrieving the next historic event.
 * @param {string} options.salt - The salt used for randomizing the historic events.
 * @param {string | undefined | null} options.cursor - The cursor indicating the current position in the historic events.
 * @returns {Promise<HistoricEvent>} The next historic event.
 * @throws {Error} If the cursor is invalid or unable to find the cursor.
 */
export const getNextHistoricEvent = async ({
  cursor,
  salt,
}: {
  salt: string;
  cursor: string | undefined | null;
}): Promise<HistoricEvent> => {
  const randomizedData = randomizeArrayWithSalt(historicEvents, salt);

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
