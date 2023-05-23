import { types as t, Instance } from "mobx-state-tree";

export const Genre = t.model('Genre', {
    id: t.identifierNumber,
    name: t.string,
})

export type IGenre = Instance<typeof Genre>;