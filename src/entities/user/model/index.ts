import { types as t, Instance } from "mobx-state-tree";

export const User = t.model("User", {
    id: t.identifierNumber,
    email: t.string,
    username: t.string,
    access: t.maybeNull(t.string),
    refresh: t.maybeNull(t.string),
})

export type IUser = Instance<typeof User>;