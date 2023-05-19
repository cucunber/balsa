export interface ITicketDto {
  id: int;
  user: int;
  session: int;
  price: int;
}

type IBuyTicketBody = Omit<ITicketDto, "id">;

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
}
