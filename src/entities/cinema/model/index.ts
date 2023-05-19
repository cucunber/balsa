import { types as t, Instance } from "mobx-state-tree";

export const Cinema = t.model('Cinema', {
    id: t.identifierNumber,
    name: t.string,
    address: t.string,
    telephone: t.maybeNull(t.string),
    email: t.string,
})

export type ICinema = Instance<typeof Cinema>