import { Country } from "entities/country/model";
import { Language } from "entities/language/model";
import { types as t, Instance } from "mobx-state-tree";

export const Person = t.model("Person", {
  id: t.identifier,
  firstName: t.string,
  lastName: t.string,
  middleName: t.maybeNull(t.string),
  country: t.reference(Country),
  language: t.reference(Language),
  avatar: t.string,
});

export type IPerson = Instance<typeof Person>;
