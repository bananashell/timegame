import HistoricEvents from "./historicEvents.json";
import z from "zod";
import { historicEvent } from "@/models/historicEvent";

const parsedHistoricEvents = z
  .array(historicEvent)
  .safeParse(HistoricEvents.data);

export const historicEvents = parsedHistoricEvents.success
  ? parsedHistoricEvents.data
  : [];

const _id = z.string().uuid();
type Id = z.infer<typeof _id>;

export const getHistoricEvent = (id: Id) => {
  id = _id.parse(id);

  const event = historicEvents.find((event) => event.id === id);
  return historicEvent.parse(event);
};
