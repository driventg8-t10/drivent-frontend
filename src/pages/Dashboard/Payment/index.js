import { useEffect, useState } from 'react';
import { getTicketTypes, getUserTicket } from '../../../services/ticketApi';
import useToken from '../../../hooks/useToken';
import TicketsPage from './TicketsPage';

export default function Payment() {
  const [ticketTypeArr, setTicketTypeArr] = useState(null);
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
        setTicketTypeArr(data);
      })
      .catch((err) => {
        setTicketTypeArr(null);
      });
  }, [ticket]);

  if (!ticketTypeArr) {
    return 'Carregando...';
  }

  if (ticketTypeArr.length === 0) {
    return 'Sem ticketType cadastrado';
  }

  if (!ticket) {
    return <TicketsPage setTicket={setTicket} ticketTypeArr={ticketTypeArr} />;
  }

  if (ticket.status === 'RESERVED') {
    return 'RESERVADO: TELA DE CARTÃO AQUI';
  }

  if (ticket.status === 'PAID') {
    return 'PAGO: TELA DE PAGO AQUI';
  }

  return 'Ops... Isso não era para ter acontecido';
}
