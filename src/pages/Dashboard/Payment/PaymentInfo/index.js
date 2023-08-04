import CreditCard from './CreditCard';
import { Typography } from '@material-ui/core';
import styled from 'styled-components';
import PaymentSummaryContainer from '../../../../components/PaymentSummaryContainer';
import usePaymentSummary from '../../../../hooks/api/usePaymentSummary';

export default function PaymentInfo() {
  const info = usePaymentSummary();
  return (
    <>
      <StyledTypography variant="h4">Ingresso e pagamento</StyledTypography>
      <StyledTitleText>Ingresso escolhido</StyledTitleText>
      <PaymentSummaryContainer info={info} />
      <StyledTitleText>Pagamento</StyledTitleText>
      <CreditCard ticketId = {info.id}/>
    </>
  );
}

const StyledTypography = styled(Typography)`
  margin-bottom: 30px!important;
`;

const StyledTitleText = styled(Typography)`
  font-weight: 400!important;
  font-size: 20px!important;
  line-height: 24px!important;
  margin-bottom: 20px!important;

  color: #8E8E8E;
`;
