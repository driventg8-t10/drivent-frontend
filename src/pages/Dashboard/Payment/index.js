import { useEffect, useState } from 'react';
import { getTicketTypes, getUserTicket } from '../../../services/ticketApi';
import useToken from '../../../hooks/useToken';

export default function Payment() {
  const [ticketType, setTicketType] = useState(null);
  const [ticket, setTicket] = useState(null);
  
  return 'Pagamento: Em breve!';
}
