import { IMovie, Movie } from "entities/movie/model";
import { types as t, Instance } from "mobx-state-tree";

export const MainStore = t
  .model("mainPage", {
    popular: t.array(Movie),
    byGenre: t.array(Movie),
    all: t.array(Movie),
  })
  .actions((self) => ({
    updatePopular(movies: IMovie[]) {
      self.popular.replace(movies);
    },
    updateByGenre(movies: IMovie[]) {
      self.byGenre.replace(movies);
    },
    updateAll(movies: IMovie[]) {
      self.all.replace(movies);
    },
  }));

export type IMainStore = Instance<typeof MainStore>;

