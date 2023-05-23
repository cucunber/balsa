import { Api } from "shared/libs/api";
import { ITicketDto, ITicketService } from "./type";

export class TicketServices implements ITicketService {
  constructor(private api: Api) {}
  async buyTicket(
    ...params: Parameters<ITicketService["buyTicket"]>
  ): ReturnType<ITicketService["buyTicket"]> {
    const [body] = params;
    try {
      const { data } = await this.api.post<ITicketDto>("/ticket", body.body);
      return [false, data];
    } catch (error) {
      return [true, null];
    }
  }
  async getTicketById(
    ...params: Parameters<ITicketService["getTicketById"]>
  ): ReturnType<ITicketService["getTicketById"]> {
    const [id] = params;
    try {
      const { data } = await this.api.get<ITicketDto>(`/ticket/${id}`);
      return [false, data];
    } catch (error) {
      return [true, null];
    }
  }
  async updateTicket(
    ...params: Parameters<ITicketService["updateTicket"]>
  ): ReturnType<ITicketService["updateTicket"]> {
    const [id, ticket] = params;
    try {
      const { data } = await this.api.patch<ITicketDto>(
        `/ticket/${id}`,
        ticket
      );
      return [false, data];
    } catch (error) {
      return [true, error];
    }
  }
  async returnTicket(
    ...params: Parameters<ITicketService["returnTicket"]>
  ): ReturnType<ITicketService["returnTicket"]> {
    const [id] = params;
    try {
      await this.api.delete(`/ticket/${id}`);
      return [false, true];
    } catch (error) {
      return [true, error];
    }
  }
  async getOccupiedPlaces(
    ...args: Parameters<ITicketService["getOccupiedPlaces"]>
  ): ReturnType<ITicketService["getOccupiedPlaces"]> {
    try {
      const [params] = args;
      const { data } = await this.api.get(`/occupied-places`, { params });
      return [false, data];
    } catch (error) {
      return [true, error];
    }
  }
  async userTickets(): ReturnType<ITicketService["userTickets"]> {
    try {
      const { data } = await this.api.get(`/tickets`);
      return [false, data];
    } catch (error) {
      return [true, null];
    }
  }
}
