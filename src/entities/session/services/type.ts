import { ICinemaDto } from "entities/cinema/services/type";
import { IHallDto } from "entities/hall/services/type";
import { IMovieDto } from "entities/movie/services/type";
import { IPriceDto } from "entities/price/services/type";

export interface ISessionDto {
    id: int,
    start_time: string,
    cinema: ICinemaDto,
    hall: IHallDto,
    movie: IMovieDto,
    price: IPriceDto[],
}

type IGetSessiomParameters = {
    datetime_from: string,
    datetime_to: string,
    price_from: string,
    price_to: string,
    movie_id: string,
    cinema_id: string,
}

export interface ISessionService {
    getSessions(params?: Partial<IGetSessiomParameters>): PromiseRequestData<ISessionDto[]>
}