import { data } from "./historicEvents.json";
import z from "zod";
import { historicEvent } from "@/models/historicEvent";

const _id = z.string().uuid();
type Id = z.infer<typeof _id>;

export const getHistoricEvent = (id: Id) => {
  id = _id.parse(id);

  const event = data.find((event) => event.id === id);
  return historicEvent.parse(event);
};
