import styled from 'styled-components';
import { Typography } from '@material-ui/core';
import DateSelection from './DateSelection';
import ActivitySelection from './ActivitySelection';
import { useEffect } from 'react';
import { getEventInfo } from '../../../services/eventApi';
import { useState } from 'react';
import useToken from '../../../hooks/useToken';
import { getBookingByUserId } from '../../../services/bookingApi';
import { getUserTicket } from '../../../services/ticketApi';

export default function Activities() {
  const [datesArray, setDate] = useState([]);
  const [selectedDate, setSelected] = useState([]);
  const [activities, setActivities] = useState([]);
  const [subscribedReloadFlag, setFlag] = useState(0);
  const [content, setContent] = useState('');

  const token = useToken();
  useEffect(() => {
    validateTicketAndHotel();
    const info = getEventInfo();
    info
      .then((res) => {
        dateFormat(res.startsAt, res.endsAt);
      })
      .catch((err) => {
      });
  }, []);

  function validateTicketAndHotel() {
    const ticket = getUserTicket(token);
    ticket
      .then((res) => {
        if(res.status === 'RESERVED') {
          setContent('No Payment');
          return 1;
        }

        if(res.TicketType.includesHotel === true && res.TicketType.isRemote === false) {
          const booking = getBookingByUserId(token);
          booking
            .then((res) => {
            })
            .catch((err) => {
              if(err.response.status === 404) {
                setContent('No Hotel');
                return 1;
              };
            });
          return 1;
        }
        else if(res.TicketType.includesHotel === false || res.TicketType.isRemote === true) {
          setContent('No Host');
        }
      })
      .catch((err) => {
        if(err.response.status === 404) {
          setContent('No Ticket');
          return 1;
        };
      });
  }

  function dateFormat(startDate, endDate) {
    const datesInRange = [];
    const currentDate = new Date(startDate);
    const lastDate = new Date(endDate);
    currentDate.setHours(0, 0, 0, 0);
    lastDate.setHours(0, 0, 0, 0);
  
    while (currentDate <= lastDate) {
      datesInRange.push(new Date(currentDate));
      currentDate.setDate(currentDate.getDate() + 1);
    }

    setDate(datesInRange);
  }

  const convertToFormattedDate = (dateString) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
  
    return `${year}-${month}-${day}`;
  };

  if(content === 'No Host') {
    return(
      <> 
        <StyledTypography variant="h4">Escolha de atividades</StyledTypography>
        <TextContainer>
          <h1>Sua modalidade de ingresso não necessita escolher atividade.</h1>
          <h1>Você terá acesso a todas as atividades.</h1>
        </TextContainer>
      </>
    );
  }

  if(content === 'No Hotel') {
    return(
      <> 
        <StyledTypography variant="h4">Escolha de atividades</StyledTypography>
        <TextContainer>
          <h1>Você precisa escolher o hotel antes de fazer a escolha de atividades.</h1>
        </TextContainer>
      </>
    );
  }

  if(content === 'No Payment') {
    return(
      <> 
        <StyledTypography variant="h4">Escolha de atividades</StyledTypography>
        <TextContainer>
          <h1>Você precisa ter confirmado pagamento antes de fazer a escolha de atividades.</h1>
        </TextContainer>
      </>
    );
  }

  if(content === 'No Ticket') {
    return(
      <> 
        <StyledTypography variant="h4">Escolha de atividades</StyledTypography>
        <TextContainer>
          <h1>Você precisa escolher um ticket antes de fazer a escolha de atividades!</h1>
        </TextContainer>
      </>
    );
  }

  return (
    <>
      <StyledTypography variant="h4">Escolha de atividades</StyledTypography>
      <DateSelection 
        datesArray = {datesArray}
        setSelected = {setSelected}
        selectedDate = {selectedDate}
        setActivities = {setActivities}
        token = {token}
        subscribedReloadFlag = {subscribedReloadFlag}
        convertToFormattedDate = {convertToFormattedDate}
      />
      <ActivitySelection 
        activities = {activities}
        token = {token} 
        setFlag = {setFlag}
        selectedDate = {selectedDate}
        setActivities = {setActivities}
        convertToFormattedDate = {convertToFormattedDate}
 
      />
    </>
  );
}

const StyledTypography = styled(Typography)`
  margin-bottom: 30px!important;
`;

const TextContainer = styled.div`
  width: 100%;
  height: 80%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  h1 {
    color: #8E8E8E!important;
    font-family: Roboto;
    font-size: 20px;
    font-weight: 400;
    line-height: 23px;
  }
`;
