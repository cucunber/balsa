import { IHallDto } from "entities/hall/services/type";

export interface IPriceDto {
    id: int,
    price: string,
    places: int,
    hall: IHallDto,
}