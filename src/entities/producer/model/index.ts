import { Person } from "entities/person/model";
import { types as t, Instance } from "mobx-state-tree";

export const Producer = Person.named('Producer');

export type IProducer = Instance<typeof Producer>;
