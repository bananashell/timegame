import HistoricEvents from "./historicEvents.json";
import z from "zod";
import { historicEvent } from "@/data/historicEvents/historicEvent";

const parsedHistoricEvents = z
  .array(historicEvent)
  .safeParse(HistoricEvents.data);

export const historicEvents = parsedHistoricEvents.success
  ? parsedHistoricEvents.data
  : [];
