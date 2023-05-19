import { Hall } from "entities/hall/model";
import { types as t, Instance } from "mobx-state-tree";

export const Price = t.model("Price", {
  id: t.identifier,
  price: t.string,
  places: t.number,
  hall: t.reference(Hall),
});

export type IPrice = Instance<typeof Price>;
