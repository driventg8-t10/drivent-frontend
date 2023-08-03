import { useEffect, useState } from 'react';
import { getTicketTypes, getUserTicket } from '../../../services/ticketApi';
import useToken from '../../../hooks/useToken';
import TicketsPage from '../../../components/TicketsPage';

export default function Payment() {
  const [ticketType, setTicketType] = useState(null);
  const [ticket, setTicket] = useState(null);
  const token = useToken();

  useEffect(() => {
    getUserTicket(token)
      .then((ticket) => {
        setTicket(ticket);
        // se PAID, tela de dados da compra
        // se RESERVED, tela de área do cartão
      })
      .catch((err) => {
        setTicket(null);
      });

    getTicketTypes(token)
      .then((data) => {
        setTicketType(data[0]);
      })
      .catch((err) => {
        setTicketType(null);
      });
  }, []);

  if (!ticketType) {
    return 'Carregando...';
  }

  if (!ticket) {
    return <TicketsPage ticketType={ticketType} />;
  }
}
