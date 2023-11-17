import { procedure } from "@/server/trpc";
import {
  getHistoricEvents,
  getNextHistoricEvent,
} from "@/server/service/historicEventService";

export const historicEventsRouter = {
  historicEvents: procedure.query((opts) => {
    return getHistoricEvents();
  }),
  historicEvent: procedure.query((opts) => {
    return getNextHistoricEvent();
  }),
};
