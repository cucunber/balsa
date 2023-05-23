import { User, IUser } from "entities/user/model";
import { types as t, Instance } from "mobx-state-tree";
import { MainStore } from "./main";
import { createContext } from "react";
import { Genre, IGenre } from "entities/genre/model";

const RootStore = t
  .model("root", {
    user: t.maybeNull(User),
    genres: t.array(Genre),
    main: MainStore,
  })
  .views((self) => ({
    profile() {
      if (self.user) {
        return {
          id: self.user.id,
          username: self.user.username,
        };
      }
      return null;
    },
  }))
  .actions((self) => ({
    updateUser(user: IUser) {
      self.user = user;
    },
    logoutUser() {
      self.user = null;
    },
    updateGenres(genres: IGenre[]) {
      self.genres.replace(genres);
    },
  }));

export type IRootStore = Instance<typeof RootStore>;

export const store = RootStore.create({
  user: null,
  genres: [],
  main: {
    popular: [],
    byGenre: [],
    all: [],
  },
});

export const StoreContext = createContext<IRootStore | null>(null);
