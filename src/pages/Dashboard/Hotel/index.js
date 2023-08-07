import { useEffect, useReducer, useState } from 'react';
import { StyledTypography } from '../../../components/PersonalInformationForm';

import useHotels from '../../../hooks/api/useHotels';
import useToken from '../../../hooks/useToken';

import { getRoomsByHotelId } from '../../../services/hotelApi';
import { bookingRoom, getBookingByUserId, updateBooking } from '../../../services/bookingApi';

import { toast } from 'react-toastify';

import {
  BookingButton,
  Container,
  DescriptionDivider,
  ErrorContainer,
  ErrorMessage,
  HotelCard,
  HotelDescription,
  HotelImage,
  HotelsSection,
  Room,
  RoomsSection,
  StyledPerson,
  StyledPersonFilled,
  SubTitle,
} from './styles';
import { useLocation, useNavigate } from 'react-router-dom';
import { getUserTicket } from '../../../services/ticketApi';

const TYPES = Object.freeze({
  SELECT_HOTEL: 'SELECT_HOTEL',
  SELECT_ROOM: 'SELECT_ROOM',
  UPDATE_ROOMS: 'UPDATE_ROOMS',
});

const reducer = (state, action) => {
  switch (action.type) {
  case TYPES.SELECT_HOTEL:
    return { ...state, hotelId: action.payload };
  case TYPES.SELECT_ROOM:
    return { ...state, roomChoosed: action.payload };
  case TYPES.UPDATE_ROOMS:
    return { ...state, roomsOfHotel: action.payload };
  default:
    return { ...state };
  }
};

export default function Hotel() {
  const { getHotels } = useHotels();
  const token = useToken();

  const location = useLocation();
  const navigate = useNavigate();

  const [hotels, setHotels] = useState([]);
  const [userTicket, setUserTicket] = useState(null);
  const [error, setError] = useState(null);

  const [{ hotelId, roomsOfHotel, roomChoosed }, dispatch] = useReducer(reducer, {
    hotelId: location?.state?.hotelId,
    roomsOfHotel: [],
    roomChoosed: location?.state?.roomId,
  });

  function calculateTotalVagancyOnHotel(hotel) {
    let totalCapacity = 0;

    if (hotel && hotel.Rooms) {
      for (const room of hotel.Rooms) {
        totalCapacity += room.capacity;
      }
    }
    return totalCapacity;
  }

  function returnTypeOfHotelRoom(rooms) {
    const types = {
      1: 'Single',
      2: 'Single, Double',
      3: 'Single, Double, Triple',
    };

    const greaterCapacity = rooms?.reduce((acc, room) => (acc = Math.max(acc, room.capacity)), 0);
    return types[greaterCapacity];
  }

  function renderPeople(totalCapacity, totalOfBookings, roomSelected) {
    const person = [];

    for (let i = 0; i < totalCapacity; i++) {
      if (i < totalOfBookings) {
        person.unshift(<StyledPersonFilled />);
      } else {
        person.unshift(<StyledPerson />);
      }
    }

    const lastIndex = person.findLastIndex((element) => element.type === StyledPerson);

    if (roomSelected) {
      person.splice(lastIndex, 1, <StyledPersonFilled isSelected />);
    }

    return person;
  }

  function handleOnClickBooking() {
    async function handleBooking() {
      try {
        await bookingRoom(token, { roomId: roomChoosed });
        toast('Quarto reservado com sucesso!');
        navigate('/dashboard/hotel/booking');
      } catch (error) {
        toast('Ocorreu um erro ao fazer a reserva');
      }
    }

    async function handleUpdateBooking() {
      try {
        await updateBooking(token, location.state.bookingId, { roomId: roomChoosed });
        toast('Troca de quarto realizada com sucesso!');
        navigate('/dashboard/hotel/booking');
      } catch (error) {
        toast('Ocorreu um erro ao atualizar a reserva');
      }
    }

    if (userIsUpdatingBooking()) {
      handleUpdateBooking();
    } else {
      handleBooking();
    }
  }

  function userIsUpdatingBooking() {
    // Se existir em location o bookingId significa que o usuário já possui reserva e está atualizando ela.
    return location?.state?.bookingId;
  }

  function getErrorMessage() {
    if (!userTicket) {
      return 'Você precisa ter confirmado o pagamento antes de fazer a escolha de hospedagem.';
    }
  
    const { TicketType, status } = userTicket;
    if (error) {
      if (TicketType?.isRemote || !TicketType?.includesHotel) {
        return 'Sua modalidade de ingresso não inclui hospedagem. Prossiga para a escolha de atividades.';
      } else if (status === 'RESERVED' || error.status === 404) {
        return 'Você precisa ter confirmado o pagamento antes de fazer a escolha de hospedagem.';
      }
    }
    return '';
  }

  const errorMessage = getErrorMessage();

  useEffect(async() => {
    try {
      const userTicket = await getUserTicket(token);
      setUserTicket(userTicket);
    } catch (error) {
      setError(error.response.status);
      return error;
    }

    try {
      const hotels = await getHotels();
      setHotels(hotels.data);
    } catch (error) {
      setError(error.response.status);
      return error;
    }

    try {
      const userBooking = await getBookingByUserId(token);
      if (!userIsUpdatingBooking() && userBooking) {
        navigate('/dashboard/hotel/booking');
      }
    } catch (error) {
      return error;
    }
  }, []);

  useEffect(async() => {
    if (hotelId) {
      const rooms = await getRoomsByHotelId(token, hotelId);
      dispatch({ type: TYPES.UPDATE_ROOMS, payload: rooms.data });
    }
  }, [hotelId]);

  return (
    <>
      <StyledTypography variant="h4">Escolha de Hotel e Quarto</StyledTypography>
      {error ? (
        <ErrorContainer>{errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>}</ErrorContainer>
      ) : (
        <Container>
          <SubTitle>Primeiro, escolha seu hotel</SubTitle>
          <HotelsSection>
            {hotels.map((hotel) => (
              <HotelCard
                isSelected={hotelId === hotel.id}
                key={hotel.id}
                onClick={() => dispatch({ type: TYPES.SELECT_HOTEL, payload: hotel.id })}
              >
                <HotelImage>
                  <img src={hotel?.image} alt="" />
                </HotelImage>
                <HotelDescription>
                  <p>{hotel?.name}</p>
                  <DescriptionDivider>
                    <h5>Tipos de acomodação:</h5>
                    <p>{returnTypeOfHotelRoom(hotel?.Rooms)}</p>
                  </DescriptionDivider>
                  <DescriptionDivider>
                    <h5>Vagas disponíveis:</h5>
                    <p>{calculateTotalVagancyOnHotel(hotel)}</p>
                  </DescriptionDivider>
                </HotelDescription>
              </HotelCard>
            ))}
          </HotelsSection>
          {hotelId && (
            <>
              <SubTitle>Ótima pedida! Agora escolha seu quarto:</SubTitle>
              <RoomsSection>
                {roomsOfHotel.map((hotelRoom) => (
                  <Room
                    key={hotelRoom.id}
                    isSelected={roomChoosed === hotelRoom.id}
                    isUnavailable={hotelRoom.capacity === hotelRoom.Booking.length}
                    onClick={() => dispatch({ type: 'SELECT_ROOM', payload: hotelRoom.id })}
                  >
                    <div>{hotelRoom.name}</div>
                    <div>
                      {renderPeople(hotelRoom.capacity, hotelRoom.Booking.length, roomChoosed === hotelRoom.id)}
                    </div>
                  </Room>
                ))}
              </RoomsSection>
              {roomChoosed && <BookingButton onClick={handleOnClickBooking}>Reservar Quarto</BookingButton>}
            </>
          )}
        </Container>
      )}
    </>
  );
}
