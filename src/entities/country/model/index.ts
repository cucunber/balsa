import { Language } from "entities/language/model";
import { types as t, Instance } from "mobx-state-tree";

export const Country = t.model("Country", {
    id: t.identifier,
    name: t.string,
    language: t.reference(Language),
});

export type ICountry = Instance<typeof Country>;
