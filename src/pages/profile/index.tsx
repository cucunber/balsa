import {
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  HStack,
  VStack,
  Text,
  Box,
  Button,
  Spinner,
  Heading,
} from "@chakra-ui/react";
import { useTicket } from "entities/ticket/api";
import { ITicketDto } from "entities/ticket/services/type";
import { observer } from "mobx-react-lite";
import { useEffect, useState, useCallback } from "react";
import { useParams } from "react-router";
import { useMst } from "shared/hooks/useMst";

const Profile = observer(() => {
  const { userTickets, returnTicket } = useTicket();
  const [tickets, setTickets] = useState<ITicketDto[]>([]);
  const profile = useMst((state) => state.profile());
  const { id } = useParams();

  const getTickets = useCallback(() => {
    if (id && profile && +id === profile.id) {
      userTickets().then(([error, data]) => {
        if (!error) {
          setTickets(data);
        }
      });
    }
  }, [id, profile, userTickets]);

  useEffect(() => {
    if (!tickets.length) {
      getTickets();
    }
  }, [getTickets, tickets.length]);

  const handleTicketReturn = useCallback(
    (id: number) => () => {
      returnTicket(id).then(([error, data]) => {
        if (!error) {
          getTickets();
        } else {
          alert(JSON.stringify(data));
        }
      });
    },
    [getTickets, returnTicket]
  );

  if (!id || !profile) {
    return null;
  }
  if (+id !== profile.id) {
    return null;
  }

  return (
    <VStack spacing={4} mt={6}>
      <Heading size="lg">Мои билеты ({tickets.length})</Heading>
      {tickets.map((ticket) => (
        <Card width="clamp(300px, 100%, 400px)" key={ticket.id}>
          <CardHeader>{ticket.session.movie.name}</CardHeader>
          <CardBody>
            <VStack w="100%">
              <HStack justifyContent="space-between" w="100%">
                <Box>
                  <Text fontWeight="bold">Зал</Text>
                  <Text>{ticket.session.hall.number}</Text>
                </Box>
                <Box>
                  <Text fontWeight="bold">Дата сеанса</Text>
                  <Text>
                    {new Date(ticket.session.start_time).toLocaleDateString()}
                  </Text>
                </Box>
                <Box>
                  <Text fontWeight="bold">Начало сеанса</Text>
                  <Text>
                    {new Date(ticket.session.start_time).toLocaleTimeString()}
                  </Text>
                </Box>
              </HStack>
              <HStack justifyContent="space-between" w="100%">
                <Box>
                  <Text fontWeight="bold">Ряд</Text>
                  <Text>{ticket.row + 1}</Text>
                </Box>
                <Box>
                  <Text fontWeight="bold">Место</Text>
                  <Text>{ticket.seat + 1}</Text>
                </Box>
                <Box>
                  <Text fontWeight="bold">Цена</Text>
                  <Text>{ticket.price.price}</Text>
                </Box>
              </HStack>
            </VStack>
          </CardBody>
          <CardFooter>
            <VStack spacing={4} alignItems="flex-start">
              <VStack>
                <Text>Кинотеатр: {ticket.session.cinema.name}</Text>
                <Text>Адрес: {ticket.session.cinema.address}</Text>
              </VStack>
              {/* <Button onClick={handleTicketReturn(ticket.id)}>
                Вернуть билет
              </Button> */}
            </VStack>
          </CardFooter>
        </Card>
      ))}
    </VStack>
  );
});

export default Profile;
