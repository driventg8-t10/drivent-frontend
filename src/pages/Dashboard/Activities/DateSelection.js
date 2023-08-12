import styled from 'styled-components';
import { Typography } from '@material-ui/core';
import MuiButton from '@material-ui/core/Button';
import { useEffect } from 'react';
import { useState } from 'react';
import { getActivities } from '../../../services/activityApi';
import { toast } from 'react-toastify';

export default function DateSelection( { token, datesArray, setSelected, selectedDate, setActivities, convertToFormattedDate } ) {
  const [showDates, setDates] = useState([]);
  const [showTitle, setShowTitle] = useState('show');
  
  useEffect(() => {
    if(datesArray !== [] || datesArray !== undefined) {
      const formattedDatesArray = datesArray.map(date => translateDate(date));
      setDates(formattedDatesArray);
    }
  }, [datesArray]);

  function translateDate(date) {
    const daysOfWeek = ['Domingo', 'Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado'];
  
    const dayOfWeek = daysOfWeek[date.getDay()];
  
    const day = String(date.getDate()).padStart(2, '0');
    const formattedDate = `${dayOfWeek}, ${day}/${(date.getMonth() + 1).toString().padStart(2, '0')}`;
    return [date.toString(), formattedDate];
  }

  function selectButton(button) {
    const dateToSend = String(convertToFormattedDate(button[0]));
    const promise = getActivities(token, dateToSend);
    promise
      .then((res) => {
        setSelected(button);    
        setActivities(res);
        setShowTitle('hide');
      })
      .catch((err) => {
        toast('Não foi possível buscar as atividades.');
      });
  }

  return (
    <>
      {
        showTitle === 'show' && <StyledTitleText show={showTitle}>Primeiro, filtre pelo dia do evento: </StyledTitleText>
      }

      <ButtonContainer>
        {
          showDates.map((e) => (
            <StyledMuiButton
              key = {e} 
              variant='contained'
              onClick={() => {selectButton(e);}}
              isselected = {(selectedDate.includes(e[1])).toString()} //Bug if remove .toString. Don`t know why 
            >  
              {e[1]}
            </StyledMuiButton>
          ))
        }       
      </ButtonContainer>
    </>
  );
}

const StyledTitleText = styled(Typography)`
  font-weight: 400!important;
  font-size: 20px!important;
  line-height: 24px!important;
  margin-bottom: 20px!important;
  color: #8E8E8E;
`;
const ButtonContainer = styled.div`
    display: flex;
    flex-wrap: wrap;
    margin-bottom: 40px;
`;

const StyledMuiButton = styled(MuiButton)`
  margin-top: 8px !important;
  margin-right: 12px !important;
  background-color: ${(props) => props.isselected === 'true' && '#FFD37D'}!important; //using string instead of bool because of the bug
  //#FFD37D
`;
