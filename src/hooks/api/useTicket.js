import useAsync from '../useAsync';
import useToken from '../useToken';

import * as ticketApi from '../../services/ticketApi';

export default function useTicket() {
  const token = useToken();

  const {
    data: tickets,
    loading: ticketsLoading,
    error: ticketsError,
    act: getTickets,
  } = useAsync(() => ticketApi.getUserTicket(token), false);

  return {
    tickets,
    ticketsLoading,
    ticketsError,
    getTickets,
  };
}
