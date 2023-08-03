import styled from 'styled-components';

export const SubTitle = styled.h5`
  color: #8e8e8e;
  font-size: 20px;
  font-weight: 300;
  margin-top: 30px;
  margin-bottom: 15px;
`;

export const HotelCard = styled.div`
  width: 100%;
  max-width: 196px;
  height: 264px;
  padding: 15px;

  border-radius: 10px;
  background: #ffeed2;
`;

export const HotelImage = styled.div`
  & > img {
    width: 100%;
    height: 109px;
    border-radius: 5px;
  }
`;

export const HotelDescription = styled.div`

`;

export const DescriptionDivider = styled.div`
  color: #3c3c3c;
  display: flex;
  flex-direction: column;
  gap: 5px;

  & > h5 {
    font-size: 12px;
    font-style: normal;
    font-weight: 700;
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
