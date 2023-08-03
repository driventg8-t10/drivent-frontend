import styled from 'styled-components';
import { BsFillPersonFill, BsPerson } from 'react-icons/bs';

export const Container = styled.div`
  font-family: 'Roboto', sans-serif;
  -ms-overflow-style: none;
  scrollbar-width: none; 

  &::-webkit-scrollbar {
    display: none;
  }
`;

export const ErrorContainer = styled.div`
  display:flex;
  justify-content: center;
  align-items: center;
  height:calc(100% - 100px);
`;

export const ErrorMessage = styled.p`
  color: #8E8E8E;
  text-align: center;
  font-size: 20px;
  font-style: normal;
  font-weight: 400;
  width:580px;
`;

export const SubTitle = styled.h4`
  color: #8e8e8e;
  font-size: 20px;
  font-weight: 300;
  margin-top: 30px;
  margin-bottom: 15px;
`;

export const HotelsSection = styled.section`
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
`;

export const HotelCard = styled.div`
  width: 100%;
  max-width: 196px;
  height: 264px;
  padding: 15px;

  border-radius: 10px;
  background: ${({ isSelected }) => (isSelected ? '#FFEED2' : '#ebebeb')};

  cursor: pointer;
`;

export const HotelImage = styled.div`
  border-radius: 5px;
  & > img {
    width: 100%;
    height: 109px;
    border-radius: 5px;
  }
`;

export const HotelDescription = styled.div`
  & > p:first-child {
    color: #343434;
    font-size: 19px;
    font-style: normal;
    font-weight: 400;
    margin: 10px 0;
  }
`;
export const DescriptionDivider = styled.div`
  color: #3c3c3c;
  display: flex;
  flex-direction: column;
  gap: 5px;

  & > h5 {
    font-size: 12px;
    font-style: normal;
    font-weight: 600;
  }

  & p {
    font-size: 12px;
    font-style: normal;
    font-weight: 400;
  }

  & + & {
    margin-top: 15px;
  }
`;

export const RoomsSection = styled.section`
  display: flex;
  flex-wrap: wrap;
  gap: 17px;
`;

export const Room = styled.div`
  max-width: 190px;
  width: 100%;
  height: 45px;

  border-radius: 10px;
  border: 1px solid #cecece;

  display: flex;
  justify-content: space-between;
  padding: 10px;
  align-items: center;

  cursor: ${({ isUnavailable }) => (isUnavailable ? 'default' : 'pointer')};

  & div:first-child {
    color: ${({ isUnavailable }) => (isUnavailable ? '#9D9D9D' : '#454545')};
    font-size: 18px;
    font-style: normal;
    font-weight: 700;
    line-height: normal;
  }

  ${({ isUnavailable, isSelected }) =>
    isUnavailable ?
      `
    border-radius: 10px;
    border: 1px solid #CECECE;
    background: #E9E9E9; 
    color:#8C8C8C;
  ` : isSelected ? `
    background: #FFEED2; 
  ` : ''};

  & svg.StyledPerson{
    color:red;
  }
`;

export const StyledPerson = styled(BsPerson)`
  font-size: 25px;
`;

export const StyledPersonFilled = styled(BsFillPersonFill)`
  font-size: 25px;
  color: ${({ isSelected }) => isSelected && '#FF4791'};
`;

export const BookingButton = styled.button`
  width:100%;
  max-width: 182px;
  height: 37px; 

  border-radius: 4px;
  background: #E0E0E0;
  box-shadow: 0px 2px 10px 0px rgba(0, 0, 0, 0.25);
  border:0;

  text-transform: uppercase;
  font-weight:400;
  cursor: pointer;

  margin-top:50px;
  margin-bottom:100px;

  transition: box-shadow .4s ease;

  &:hover{
    box-shadow: 0px 2px 20px 0px rgba(0, 0, 0, 0.4);
  }

`;
