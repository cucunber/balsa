import { types as t, Instance } from "mobx-state-tree";

export const User = t.model("User", {
    id: t.identifier,
    email: t.string,
    username: t.string,
})

export type IUser = Instance<typeof User>;