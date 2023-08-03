import useAsync from '../useAsync';
import useToken from '../useToken';

import * as hotelApi from '../../services/hotelApi';

export default function useHotels() {
  const token = useToken();

  const {
    data: hotels,
    loading: hotelsLoading,
    error: hotelsError,
    act: getHotels,
  } = useAsync(() => hotelApi.getHotels(token), false);

  return {
    hotels,
    hotelsLoading,
    hotelsError,
    getHotels,
  };
}

export function useRooms() {
  const {
    data: rooms,
    loading: roomsLoading,
    error: roomsError,
    act: getRooms,
  } = useAsync(hotelApi.getRoomsByHotelId, false);

  return {
    rooms,
    roomsLoading,
    roomsError,
    getRooms,
  };
}
