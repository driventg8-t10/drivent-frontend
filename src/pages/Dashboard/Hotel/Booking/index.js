import React, { useEffect, useState } from 'react';
import { StyledTypography } from '../../../../components/PersonalInformationForm';

import { useNavigate } from 'react-router-dom';
import { HotelCard } from './styles';
import useToken from '../../../../hooks/useToken';
import { getBookingByUserId } from '../../../../services/bookingApi';
import { BookingButton, DescriptionDivider, HotelDescription, HotelImage, SubTitle } from '../styles';

function Booking() {
  const [booking, setBooking] = useState(null);
  const navigate = useNavigate();
  const token = useToken();

  function returnRoomType(capacity) {
    const types = {
      1: 'Single',
      2: 'Double',
      3: 'Triple',
    };
    return types[capacity];
  }

  function returnTotalOfPersonOnRoom(bookings) {
    const possibilities = {
      1: 'Somente você.',
      2: 'Você, e mais 1.',
      3: 'Você, e mais 2.',
    };

    return possibilities[bookings];
  }

  function handleOnClickButton(hotelId, roomId, bookingId) {
    navigate('/dashboard/hotel', { state: { hotelId, roomId, bookingId } });
  }

  useEffect(async() => {
    try {
      const userBooking = await getBookingByUserId(token);
      setBooking(userBooking.data);
    } catch (error) {
      navigate('/dashboard/hotel');
    }
  }, []);

  return (
    <div>
      <StyledTypography variant="h4">Ingresso e Pagamento</StyledTypography>
      <SubTitle>Você já escolheu seu quarto:</SubTitle>
      <HotelCard>
        <HotelImage>
          <img src={booking?.Room?.Hotel?.image} alt="" />
        </HotelImage>
        <HotelDescription>
          <p>{booking?.Room?.Hotel?.name}</p>
          <DescriptionDivider>
            <h5>Quarto reservado</h5>
            <p>
              {booking?.Room?.name} ({returnRoomType(booking?.Room?.capacity)})
            </p>
          </DescriptionDivider>

          <DescriptionDivider>
            <h5>Pessoas no seu quarto</h5>
            <p>{returnTotalOfPersonOnRoom(booking?.Room?.Booking?.length)}</p>
          </DescriptionDivider>
        </HotelDescription>
      </HotelCard>
      <BookingButton onClick={() => handleOnClickButton(booking?.Room?.hotelId, booking?.Room?.id, booking?.id)}>Trocar quarto</BookingButton>
    </div>
  );
}

export default Booking;
