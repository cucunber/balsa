import { Cinema } from "entities/cinema/model";
import { Hall } from "entities/hall/model";
import { Movie } from "entities/movie/model";
import { Price } from "entities/price/model";
import { types as t, Instance } from "mobx-state-tree";

export const Session = t.model('Session', {
    id: t.identifier,
    startTime: t.Date,
    cinema: t.reference(Cinema),
    hall: t.reference(Hall),
    movie: t.reference(Movie),
    price: t.reference(Price),
})

export type ISession = Instance<typeof Session>;