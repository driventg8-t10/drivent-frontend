import styled from 'styled-components';
import SquareButton from './SquareButton';
import { useEffect, useState } from 'react';
import useToken from '../../../../hooks/useToken';
import { postReserveTicket } from '../../../../services/ticketApi';

export default function TicketsPage(props) {
  const { ticketTypeArr, setTicket } = props;
  const [ticketTypesAuxArr, setTicketTypeAuxArr] = useState(ticketTypeArr);
  const [presenceType, setPresenceType] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [accomodationType, setAccomodationType] = useState('');
  const [totalPrice, setTotalPrice] = useState(0);
  const token = useToken();

  useEffect(() => {
    let price = 0;
    presenceType === 'online' ? (price += 100) : (price += ticketTypeArr[0].price);
    accomodationType === 'hotel' && (price += 350);
    setTotalPrice(price);
  }, [presenceType, accomodationType]);

  async function reserveTicket() {
    let arr = ticketTypeArr;
    if (presenceType === 'presencial') {
      arr = arr.filter((ticketType) => !ticketType.isRemote);
    } else {
      arr = arr.filter((ticketType) => ticketType.isRemote);
    }
    if (accomodationType === 'hotel' && presenceType === 'presencial') {
      arr = arr.filter((ticketType) => ticketType.includesHotel);
    } else if (presenceType === 'presencial') {
      arr = arr.filter((ticketType) => !ticketType.includesHotel);
    }

    setIsLoading(true);
    await postReserveTicket(token, arr[0].id)
      .then((res) => {
        console.log(res);
        setTicket(res);
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err.response.data);
        setIsLoading(false);
      });
  }

  return (
    <TicketsContainer>
      <h1>Ingresso e pagamento</h1>
      <h2>Primeiro, escolha sua modalidade de ingresso</h2>
      <ButtonsContainer>
        {ticketTypeArr.some((ticketType) => !ticketType.isRemote) && (
          <>
            <SquareButton
              onClick={() => {
                setPresenceType('presencial');
                setTicketTypeAuxArr(ticketTypeArr.filter((ticketType) => !ticketType.isRemote));
                setAccomodationType('');
              }}
              text="Presencial"
              price={ticketTypeArr[0].price}
              isSelected={presenceType === 'presencial'}
              disabled={isLoading}
            />
          </>
        )}{' '}
        {ticketTypeArr.some((ticketType) => ticketType.isRemote) && (
          <>
            <SquareButton
              onClick={() => {
                setPresenceType('online');
                setTicketTypeAuxArr(ticketTypeArr.filter((ticketType) => ticketType.isRemote));
                setAccomodationType('');
              }}
              text="Online"
              price={100}
              isSelected={presenceType === 'online'}
              disabled={isLoading}
            />
          </>
        )}
      </ButtonsContainer>
      {presenceType === 'presencial' && (
        <>
          <h2>Ótimo! Agora escolha sua modalidade de hospedagem</h2>
          <ButtonsContainer>
            {ticketTypesAuxArr.some((ticketType) => ticketType.includesHotel === true) ? (
              <>
                <SquareButton
                  onClick={() => setAccomodationType('noHotel')}
                  text="Sem Hotel"
                  plusChar={true}
                  price={0}
                  isSelected={accomodationType === 'noHotel'}
                  disabled={isLoading}
                />
                <SquareButton
                  onClick={() => setAccomodationType('hotel')}
                  text="Com Hotel"
                  plusChar={true}
                  price={350}
                  isSelected={accomodationType === 'hotel'}
                  disabled={isLoading}
                />
              </>
            ) : (
              <>
                <SquareButton
                  onClick={() => setAccomodationType('noHotel')}
                  text="Sem Hotel"
                  plusChar={true}
                  price={0}
                  isSelected={accomodationType === 'noHotel'}
                  disabled={isLoading}
                />
              </>
            )}
          </ButtonsContainer>
        </>
      )}
      {(accomodationType !== '' || presenceType === 'online') && (
        <>
          <h2>
            Fechado! O total ficou em <span>R$ {totalPrice}</span>. Agora é só confirmar:
          </h2>
          <ReserveButton onClick={reserveTicket} disabled={isLoading}>
            {isLoading ? 'RESERVANDO...' : 'RESERVAR INGRESSO'}
          </ReserveButton>
        </>
      )}
    </TicketsContainer>
  );
}

const ReserveButton = styled.button`
  width: 162px;
  height: 37px;
  border-radius: 4px;
  background: #e0e0e0;
  box-shadow: 0px 2px 10px 0px rgba(0, 0, 0, 0.25);
  border: none;
  text-align: center;
  font-family: Roboto;
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  cursor: pointer;
`;

const ButtonsContainer = styled.div`
  display: flex;
  gap: 24px;
`;

const TicketsContainer = styled.div`
  width: 100%;
  height: 100%;
  h1 {
    font-family: Roboto;
    font-size: 34px;
    font-weight: 400;
    line-height: 40px;
    letter-spacing: 0em;
    text-align: left;
  }
  h2 {
    margin-top: 37px;
    margin-bottom: 17px;
    color: #8e8e8e;
    font-family: Roboto;
    font-size: 20px;
    font-weight: 400;
    line-height: 23px;
    letter-spacing: 0em;
    text-align: left;
    span {
      font-weight: 700;
    }
  }
`;
