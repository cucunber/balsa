import { Person } from "entities/person/model";
import { types as t, Instance } from "mobx-state-tree";

export const Director = Person.named('Director');

export type IDirector = Instance<typeof Director>;
