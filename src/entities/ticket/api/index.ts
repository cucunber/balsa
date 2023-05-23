import { instance } from "shared/constants/api/instance";
import { TicketServices } from "../services";
import { useCallback, useRef } from "react";
import { ITicketDto } from "../services/type";

export const useTicket = () => {
  const ticketService = useRef(new TicketServices(instance));
  const buyTicket = useCallback(
    async (body: Omit<ITicketDto, "id" | "session" | "price">) => {
      const data = await ticketService.current.buyTicket({ body });
      return data;
    },
    []
  );
  const occupiedPlaces = useCallback(async (session_id: string) => {
    const data = await ticketService.current.getOccupiedPlaces({ session_id });
    return data;
  }, []);
  const userTickets = useCallback(async () => {
    const data = await ticketService.current.userTickets();
    return data;
  }, []);
  const returnTicket = useCallback(async (id: number) => {
    const data = await ticketService.current.returnTicket(id);
    return data;
  }, []);
  return {
    buyTicket,
    occupiedPlaces,
    userTickets,
    returnTicket,
  };
};
