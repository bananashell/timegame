import { data } from "./historicEvents.json";
import z from "zod";
import { historicEvent } from "@/models/historicEvent";

export const historicEvents = z.array(historicEvent).parse(data);

const _id = z.string().uuid();
type Id = z.infer<typeof _id>;

export const getHistoricEvent = (id: Id) => {
  id = _id.parse(id);

  const event = historicEvents.find((event) => event.id === id);
  return historicEvent.parse(event);
};
