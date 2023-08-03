import styled from 'styled-components';
import SquareButton from './SquareButton';
import { useEffect, useState } from 'react';

export default function TicketsPage(props) {
  const { ticketType } = props;
  const [isRemote, setIsRemote] = useState(ticketType.isRemote);
  const [includesHotel, setIncludesHotel] = useState(ticketType.includesHotel);
  const [presenceType, setPresenceType] = useState('');
  const [accomodationType, setAccomodationType] = useState('');
  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    let price = 0;
    presenceType === 'online' ? (price += 100) : (price += ticketType.price);
    accomodationType === 'hotel' && (price += 350);
    setTotalPrice(price);
  }, [presenceType, accomodationType]);

  function reserveTicket() {
    
  }

  return (
    <TicketsContainer>
      <h1>Ingresso e pagamento</h1>
      <h2>Primeiro, escolha sua modalidade de ingresso</h2>
      <ButtonsContainer>
        {isRemote ? (
          <>
            <SquareButton
              onClick={() => setPresenceType('presencial')}
              text="Presencial"
              price={ticketType.price}
              isSelected={presenceType === 'presencial'}
            />
            <SquareButton
              onClick={() => {
                setPresenceType('online');
                setAccomodationType('');
              }}
              text="Online"
              price={100}
              isSelected={presenceType === 'online'}
            />
          </>
        ) : (
          <>
            <SquareButton
              onClick={() => setPresenceType('presencial')}
              text="Presencial"
              price={270}
              isSelected={presenceType === 'presencial'}
            />
          </>
        )}
      </ButtonsContainer>
      {presenceType === 'presencial' && (
        <>
          <h2>Ótimo! Agora escolha sua modalidade de hospedagem</h2>
          <ButtonsContainer>
            {includesHotel ? (
              <>
                <SquareButton
                  onClick={() => setAccomodationType('noHotel')}
                  text="Sem Hotel"
                  plusChar={true}
                  price={0}
                  isSelected={accomodationType === 'noHotel'}
                />
                <SquareButton
                  onClick={() => setAccomodationType('hotel')}
                  text="Com Hotel"
                  plusChar={true}
                  price={350}
                  isSelected={accomodationType === 'hotel'}
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
          <ReserveButton onClick={reserveTicket}>RESERVAR INGRESSO</ReserveButton>
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
