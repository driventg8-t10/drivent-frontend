import React, { useEffect } from 'react';
import { Container, PaymentCheckBox, PaymentDescritionBox, SubTitle, TicketStatusBox, Wrapper } from './styles';
import { StyledTypography } from '../../../../components/PersonalInformationForm';
import CircleCheck from '../../../../assets/images/circle-check.svg';
import useTicket from '../../../../hooks/api/useTicket';
import { useNavigate } from 'react-router-dom';

function Confirmed() {
  const { tickets, ticketsError } = useTicket();

  const navigate = useNavigate();

  useEffect(() => {
    if (ticketsError) {
    }
  }, []);
  
  return (
    <Container>
      <StyledTypography variant="h4">Ingresso e pagamento</StyledTypography>
      <Wrapper>
        <SubTitle>Ingresso escolhido</SubTitle>
        <TicketStatusBox>
          <p>Presencial + Com Hotel</p>
          <p>R$ 600</p>
        </TicketStatusBox>
      </Wrapper>

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
