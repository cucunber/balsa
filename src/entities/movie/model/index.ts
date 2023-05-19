import { Actor } from "entities/actor/model";
import { Country } from "entities/country/model";
import { Director } from "entities/director/model";
import { Genre } from "entities/genre/model";
import { Language } from "entities/language/model";
import { Producer } from "entities/producer/model";
import { types as t, Instance } from "mobx-state-tree";

export const Movie = t.model('Model', {
    id: t.identifier,
    name: t.string,
    releaseDate: t.Date,
    rating: t.number,
    duration: t.number,
    director: t.reference(Director),
    producer: t.reference(Producer),
    genre: t.reference(Genre),
    actor: t.reference(Actor),
    country: t.reference(Country),
    language: t.reference(Language),
})

export type IMovie = Instance<typeof Movie>;
