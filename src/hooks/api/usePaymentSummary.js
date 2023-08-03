import { useEffect, useState } from 'react';
import useToken from '../useToken';
import { getTickets } from '../../services/payment-infoApi';
import { useNavigate } from 'react-router-dom';

export default function usePaymentSummary() {
  const navigate = useNavigate();
  const token = useToken();
  const [info, setInfo] = useState({
    price: 'R$ ----',
    hotel: '---------',
    remote: '---------'
  });

  useEffect(() => {
    const promise = getTickets(token);
    promise
      .then((res) => {
        const updatedInfo = {
          price: `R$ ${res.TicketType.price}`,
          hotel: res.TicketType.includesHotel === true ? 'Com Hotel' : 'Sem Hotel',
          remote: !res.TicketType.isRemote ? 'Presencial +' : 'Online',
          status: res.status
        };
        setInfo(updatedInfo);
      })
      .catch((err) => {
        navigate('/dashboard/payment');
      });
  }, []);

  return(info);
}
