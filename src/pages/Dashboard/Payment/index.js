import { useEffect, useState } from 'react';
import { getTicketTypes, getUserTicket } from '../../../services/ticketApi';
import useToken from '../../../hooks/useToken';
import TicketsPage from './TicketsPage';
import Confirmed from './Confirmed';
import PaymentInfo from './PaymentInfo';
import UnregisteredUser from './UnregisteredUser';
import useEnrollment from '../../../hooks/api/useEnrollment';
import LoadingPage from './LoadingPage';

export default function Payment() {
  const [ticketTypeArr, setTicketTypeArr] = useState(null);
  const [ticket, setTicket] = useState(null);
  const [ticketTypeLoading, setTicketTypeLoading] = useState(false);
  const [ticketLoading, setTicketLoading] = useState(false);
  const userToken = useToken();
  const { enrollment } = useEnrollment();

  function updateTicketPage(token) {
    setTicketLoading(true);
    setTicketTypeLoading(true);

    getUserTicket(token)
      .then((ticket) => {
        setTicket(ticket);
        setTicketLoading(false);
      })
      .catch((err) => {
        setTicket(null);
        setTicketLoading(false);
      });

    getTicketTypes(token)
      .then((data) => {
        setTicketTypeArr(data);
        setTicketTypeLoading(false);
      })
      .catch((err) => {
        setTicketTypeArr(null);
        setTicketTypeLoading(false);
      });
  }

  useEffect(() => {
    updateTicketPage(userToken);
  }, []);

  if (ticketLoading || ticketTypeLoading) {
    return <LoadingPage />;
  }

  if (!enrollment) {
    return <UnregisteredUser />;
  }

  if (ticketTypeArr.length === 0) {
    return 'Sem ticketType cadastrado';
  }

  if (!ticket) {
    return <TicketsPage updateTicketPage={() => updateTicketPage(userToken)} ticketTypeArr={ticketTypeArr} />;
  }

  if (ticket.status === 'RESERVED') {
    return <PaymentInfo updateTicketPage={() => updateTicketPage(userToken)} />;
  }

  if (ticket.status === 'PAID') {
    return <Confirmed />;
  }

  return 'Ops... Isso não era para ter acontecido';
}
