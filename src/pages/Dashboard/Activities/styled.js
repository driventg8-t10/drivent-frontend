import styled from 'styled-components';
import { Typography } from '@material-ui/core';
import { CgEnter } from 'react-icons/cg';
import { AiOutlineCloseCircle, AiOutlineCheckCircle } from 'react-icons/ai';

export const GeneralContainer = styled.div`
    display: flex;
`;

export const ActivityContainer = styled.div`
    width: 290px;
    >div {
        border: 1px #D7D7D7 solid;
        height: 392px;
        padding: 10px;
    }
`;

export const PlaceText = styled(Typography)`
  margin-bottom: 10px!important;
  color: #7B7B7B!important;
  font-size: 17px!important;
  text-align: center;
`;

export const TalkContainer = styled.div` 
  display: flex;
  background-color: ${(props) => !props.subscribed ? '#F1F1F1' : '#D0FFDB'};
  justify-content: space-between;
  border-radius: 5px;
  height: ${(props) => props.size ? `${props.size}px` : '80px'};
  margin-bottom: 10px;
  padding: 10px 10px 10px 10px;
  width: 265px;
  >div:first-child{
  max-width: 190px;
  }
  >div:nth-child(2){
    display: flex; flex-direction: column; 
    justify-content: center; align-items: center;
    border-left: 1px solid;
    border-color: ${(props) => !props.subscribed ? '#CFCFCF' : '#99E8A1'};
    color: ${(props) => !props.isFull ? '#078632' : '#CC6666'};;
    padding-left: 10px;
    min-width: 50px;
    }
`;

export const TalkTitle = styled(Typography)`
  margin-bottom: 3px!important;
  color: #343434!important;
  font-size: 12px!important;
  font-weight: 700!important;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
`;

export const HourInfo = styled(Typography)`
  font-size: 12px!important;
  font-weight: 400!important;
`;

export const VacancyInfo = styled(Typography)`
font-size: 9px!important;
font-weight: 400!important;
margin-top: 5px!important;
`;

export const IconEnter = styled(CgEnter)`
 font-size: 20px;
`;

export const IconSubscribed = styled(AiOutlineCheckCircle)`
 font-size: 22px;
`;

export const IconFull = styled(AiOutlineCloseCircle)`
 font-size: 22px;
`;

