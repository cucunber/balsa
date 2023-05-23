import {
  Card,
  CardBody,
  CardHeader,
  Heading,
  Spinner,
  VStack,
  Text,
  Stack,
  HStack,
  Box,
  CardFooter,
  Button,
  Alert,
  AlertTitle,
  AlertIcon,
  Modal,
  ModalContent,
  ModalOverlay,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Grid,
  useDisclosure,
  GridItem,
} from "@chakra-ui/react";
import { IPriceDto } from "entities/price/services/type";
import { useSession } from "entities/session/api";
import { ISessionDto } from "entities/session/services/type";
import { useTicket } from "entities/ticket/api";
import { observer } from "mobx-react-lite";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { getLinkPath } from "shared/constants/routes";
import { useMst } from "shared/hooks/useMst";

interface IBuyModal {
  session: ISessionDto;
  profileId: number;
  isOpen: boolean;
  onClose: () => void;
}

const getPriceRange = (prices: IPriceDto[]) => {
  const prices_ = prices.map((price) => parseFloat(price.price));
  const max = Math.max.apply(this, prices_);
  return prices.find((price) => parseFloat(price.price) === max) as IPriceDto;
};

const BuyModal = ({ session, profileId, ...controls }: IBuyModal) => {
  const [places, setPlaces] = useState<Array<{ row: number; seat: number }>>(
    []
  );
  const navigator = useNavigate();
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [occupied, setOccupied] = useState<{ row: number; seat: number }[]>([]);
  const { buyTicket, occupiedPlaces } = useTicket();

  useEffect(() => {
    if (!session) {
      return;
    }
    occupiedPlaces(`${session.id}`).then(([error, data]) => {
      if (!error) {
        setOccupied(data);
      }
    });
  }, [occupiedPlaces, session]);

  const placeMatrix = useMemo(() => {
    if (!session || !profileId) {
      return [[{ row: 0, seat: 0 }]];
    }
    const { hall } = session;
    const { seats_count, rows_count } = hall;
    return Array.from({ length: rows_count }, (_, row) =>
      Array.from({ length: seats_count }, (_, seat) => ({
        row,
        seat,
      }))
    );
  }, [profileId, session]);

  const price = useMemo(() => {
    if (!session || !profileId) {
      return {} as IPriceDto;
    }
    return getPriceRange(session.price);
  }, [profileId, session]);

  const handleSetPlace = useCallback(
    (place_: (typeof places)[number]) => () => {
      const isSelected = places.findIndex(
        (place) => place.row === place_.row && place.seat === place_.seat
      );
      const result =
        isSelected === -1
          ? [...places, place_]
          : [...places.slice(0, isSelected), ...places.slice(isSelected + 1)];

      setPlaces(result);
    },
    [places]
  );

  const isActive = (place_: (typeof places)[number]) =>
    places.find(
      (place) => place.row === place_.row && place.seat === place_.seat
    );

  const isOccupied = (place_: (typeof places)[number]) =>
    occupied.find(
      (place) => place.row === place_.row && place.seat === place_.seat
    );

  const handleBuy = useCallback(async () => {
    setLoading(true);
    const request = places.map((place) =>
      buyTicket({
        session_id: session.id,
        user: profileId,
        row: place.row,
        seat: place.seat,
        price_id: +price.id,
      })
    );
    const data = await Promise.allSettled(request);
    const success = data.some(({ status }) => status === "fulfilled");
    setLoading(false);
    setSuccess(success);
    if (success) {
      setTimeout(() => {
        navigator(getLinkPath("profile.path", { id: profileId }));
      }, 5000);
    }
  }, [buyTicket, navigator, places, price.id, profileId, session]);

  if (!session || !profileId) {
    return null;
  }

  return (
    <Modal {...controls}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Билет на {session.movie.name}</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <HStack spacing={4}>
            <VStack>
              <Text fontWeight="bold">Кинотеатр</Text>
              <Text>{session.cinema.name}</Text>
            </VStack>
            <VStack>
              <Text fontWeight="bold">Зал</Text>
              <Text>{session.hall.id}</Text>
            </VStack>
            <VStack>
              <Text fontWeight="bold">Цена за билет</Text>
              <Text>{price.price}</Text>
            </VStack>
          </HStack>
          <Text my={2}>Выберите места</Text>
          <Box
            my={2}
            sx={{
              w: "100%",
              height: "4px",
              background: "#202C39",
              opacity: 0.5,
            }}
          />
          <Grid
            templateRows={`repeat(${session.hall.rows_count}, 1fr)`}
            templateColumns={`repeat(${session.hall.seats_count}, 1fr)`}
          >
            {placeMatrix.map((rows, row) =>
              rows.map((place_, seat) => (
                <Button
                  isDisabled={!!isOccupied(place_)}
                  key={`${row}${seat}`}
                  sx={{
                    background: isActive(place_) ? "#F2D492" : "#202C39",
                    opacity: isOccupied(place_) ? "0.7" : "1",
                  }}
                  onClick={handleSetPlace(place_)}
                />
              ))
            )}
          </Grid>
        </ModalBody>
        <ModalFooter>
          <VStack w="100%">
            <HStack>
              <Text mr={2}>
                Цена: {parseFloat(price.price) * places.length}
              </Text>
              <Button
                onClick={handleBuy}
                isDisabled={places.length === 0}
                isLoading={loading}
              >
                Купить
              </Button>
            </HStack>
            {success && (
              <Alert status="success">
                <AlertIcon />
                <AlertTitle>
                  Билеты куплены. Через 5 секунда Вас направит в личный кабинет
                </AlertTitle>
              </Alert>
            )}
          </VStack>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

interface IModalData extends Pick<IBuyModal, "profileId" | "session"> {}

const Session = observer(() => {
  const [searchParams] = useSearchParams();
  const [sessions, setSessions] = useState<ISessionDto[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [modalData, setModalData] = useState<IModalData>({} as IModalData);
  const { isOpen, onOpen, onClose } = useDisclosure();

  const profile = useMst((state) => state.profile());

  const { getSessions } = useSession();

  const movieId = searchParams.get("movie_id");

  const handleBuy = useCallback(
    (data: IModalData) => () => {
      onOpen();
      setModalData(data);
    },
    [onOpen]
  );

  useEffect(() => {
    setLoading(true);
    if (movieId) {
      getSessions({ movie_id: movieId })
        .then(([error, data]) => {
          if (error) {
            setError(JSON.stringify(data));
          } else {
            setSessions(data);
          }
        })
        .finally(() => setLoading(false));
    }
  }, [getSessions, movieId]);

  if (loading) {
    return (
      <VStack mt={6}>
        <Spinner />
      </VStack>
    );
  }

  return (
    <Stack mt={6} align="center">
      <VStack align="center" spacing={2} width={"clamp(300px, 100%, 500px)"}>
        {sessions.length === 0 && (
          <Card>
            <CardHeader>
              <Heading size={"lg"}>Сессии отсутсвуют</Heading>
            </CardHeader>
          </Card>
        )}
        {sessions.length !== 0 &&
          sessions.map((session) => (
            <Card key={session.id} width="100%">
              <CardHeader>
                <Heading size="md">{session.cinema.name}</Heading>
                <Text>Адрес: {session.cinema.address}</Text>
                {session.cinema.telephone && (
                  <Text>Телефон: {session.cinema.telephone}</Text>
                )}
              </CardHeader>
              <CardBody>
                <HStack alignItems="flex-start" spacing={4}>
                  <VStack alignItems="flex-start">
                    <Box>
                      <Text fontWeight="bold">Фильм</Text>
                      <Text>{session.movie.name}</Text>
                    </Box>
                    <Box>
                      <Text fontWeight="bold">Продолжительность</Text>
                      <Text>{Math.ceil(session.movie.duration / 60)} мин</Text>
                    </Box>
                  </VStack>
                  <VStack alignItems="flex-start">
                    <Box>
                      <Text fontWeight="bold">Дата сеанса</Text>
                      <Text>
                        {new Date(session.start_time).toLocaleDateString()}
                      </Text>
                    </Box>
                    <Box>
                      <Text fontWeight="bold">Начало сеанса</Text>
                      <Text>
                        {new Date(session.start_time).toLocaleTimeString()}
                      </Text>
                    </Box>
                  </VStack>
                </HStack>
              </CardBody>
              <CardFooter>
                <VStack w="100%">
                  <HStack w="100%" justifyContent="space-between">
                    <Box>
                      <Text fontWeight="bold">Цена билета</Text>
                      <Text>{getPriceRange(session.price).price}</Text>
                    </Box>
                    <Button
                      onClick={handleBuy({
                        session,
                        profileId: profile?.id || 0,
                      })}
                      isDisabled={!profile}
                    >
                      Купить билет
                    </Button>
                  </HStack>
                </VStack>
                {!profile && (
                  <Alert status="warning">
                    <AlertIcon />
                    <AlertTitle>
                      Зайдите в личный кабинет, чтобы купить билет
                    </AlertTitle>
                  </Alert>
                )}
              </CardFooter>
            </Card>
          ))}
      </VStack>
      <BuyModal {...modalData} isOpen={isOpen} onClose={onClose} />
    </Stack>
  );
});

export default Session;
