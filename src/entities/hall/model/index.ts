import { types as t, Instance } from "mobx-state-tree";

export const Hall = t.model("Hall", {
  id: t.identifier,
  number: t.number,
  places: t.number,
  cinemaId: t.number,
});

export type IHall = Instance<typeof Hall>;
