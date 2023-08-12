import styled from 'styled-components';
import { Typography } from '@material-ui/core';
import DateSelection from './DateSelection';
import ActivitySelection from './ActivitySelection';
import { useEffect } from 'react';
import { getEventInfo } from '../../../services/eventApi';
import { useState } from 'react';
import useToken from '../../../hooks/useToken';

export default function Activities() {
  const [datesArray, setDate] = useState([]);
  const [selectedDate, setSelected] = useState([]);
  const [activities, setActivities] = useState([]);
  const [subscribedReloadFlag, setFlag] = useState(0);

  const token = useToken();
  useEffect(() => { 
    const info = getEventInfo();
    info
      .then((res) => {
        dateFormat(res.startsAt, res.endsAt);
      })
      .catch((err) => {
      });
  }, []);

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

  return (
    <>
      <StyledTypography variant="h4">Escolha as atividades</StyledTypography>
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
