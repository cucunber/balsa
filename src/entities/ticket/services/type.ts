import { IPriceDto } from "entities/price/services/type";
import { ISessionDto } from "entities/session/services/type";

export interface ITicketDto {
  id: int;
  user: int;
  row: int;
  seat: int;
  session: ISessionDto;
  price: IPriceDto;
  session_id: int;
  price_id: int;
}

interface IOccupiedPlacesProperties {
  session_id: string;
}

type IBuyTicketBody = Omit<ITicketDto, "id" | "session" | "price">;

type IBuyTicketParameters = {
  body: IBuyTicketBody;
};

type IUpdateTicketParameters = Omit<ITicketDto, "id">;

export interface ITicketService {
  buyTicket(params: IBuyTicketParameters): PromiseRequestData<ITicketDto>;
  getTicketById(id: ITicketDto["id"]): PromiseRequestData<ITicketDto>;
  updateTicket(
    id: ITicketDto["id"],
    params: IUpdateTicketParameters
  ): PromiseRequestData<ITicketDto>;
  returnTicket(id: ITicketDto["id"]): PromiseRequestData<boolean>;
  getOccupiedPlaces(
    params: IOccupiedPlacesProperties
  ): PromiseRequestData<Pick<ITicketDto, "row" | "seat">[]>;
  userTickets(): PromiseRequestData<ITicketDto[]>;
}
