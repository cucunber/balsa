import { Person } from "entities/person/model";
import { types as t, Instance } from "mobx-state-tree";

export const Actor = Person.named('Actor');

export type IActor = Instance<typeof Actor>;
