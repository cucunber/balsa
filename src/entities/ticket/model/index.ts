import { types as t, Instance } from "mobx-state-tree";

export const Ticket = t.model("Ticket", {
  id: t.identifier,
  userId: t.number,
  priceId: t.number,
});

export type ITicket = Instance<typeof Ticket>;
