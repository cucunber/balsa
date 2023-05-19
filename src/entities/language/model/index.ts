import { types as t, Instance } from "mobx-state-tree";

export const Language = t.model("Language", {
  id: t.identifier,
  name: t.string,
  code: t.string,
});

export type ILanguage = Instance<typeof Language>;
