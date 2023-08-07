import React, { useEffect } from 'react';
import { Container, PaymentCheckBox, PaymentDescritionBox, SubTitle, TicketStatusBox, Wrapper } from './styles';
import { StyledTypography } from '../../../../components/PersonalInformationForm';
import CircleCheck from '../../../../assets/images/circle-check.svg';
import useTicket from '../../../../hooks/api/useTicket';
import { useNavigate } from 'react-router-dom';
import usePaymentSummary from '../../../../hooks/api/usePaymentSummary';
import PaymentSummaryContainer from '../../../../components/PaymentSummaryContainer';

function Confirmed() {
  const { tickets, ticketsError } = useTicket();
  const info = usePaymentSummary();

  useEffect(() => {
    if (ticketsError) {
    }
  }, []);

  return (
    <Container>
      <StyledTypography variant="h4">Ingresso e pagamento</StyledTypography>
      <PaymentSummaryContainer info={info} />

      <Wrapper>
        <SubTitle>Pagamentos</SubTitle>
        <PaymentCheckBox>
          <img src={CircleCheck} alt="Green circle check" />
          <PaymentDescritionBox>
            <p>Pagamento confirmado!</p>
            <p>Prossiga para escolha de hospedagem e atividades</p>
          </PaymentDescritionBox>
        </PaymentCheckBox>
      </Wrapper>
    </Container>
  );
}

export default Confirmed;
