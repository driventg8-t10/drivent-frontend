import styled from 'styled-components';

export const Container = styled.div`
  height: calc(100% - 60px);
`;

export const Wrapper = styled.section`
  width: 100%;

  & > * {
    margin-top: 15px;
  }
`;

export const TicketStatusBox = styled.div`
  width: 100%;
  max-width: 290px;
  height: 108px;

  background-color: #ffeed2;
  border-radius: 20px;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  & > p{
    
  }
`;

export const SubTitle = styled.h4`
  color: #8e8e8e;
  font-size: 20px;
  font-style: normal;
  font-weight: 400;
`;

export const PaymentCheckBox = styled.div`
  display: flex;
  gap: 5px;
`;

export const PaymentDescritionBox = styled.div`
  font-size: 16px;

  & > p {
    margin-top: 5px;
  }

  & > p:first-child {
    opacity: 0.9;
  }

  & > p:not(:first-child) {
    color: #454545;
  }
`;
