import CreditCard from './CreditCard';
import { PaymentSummaryContainer, TitleSummary, StyledTitleText, StyledTypography, PriceSummary } from './styled';

export default function PaymentInfo() {
  return (
    <>

      <StyledTypography variant="h4">Ingresso e pagamento</StyledTypography>
      <StyledTitleText>Ingresso escolhido</StyledTitleText>
      <PaymentSummaryContainer>
        <TitleSummary> Presencial + Com Hotel</TitleSummary>
        <PriceSummary> R$ 600</PriceSummary>
      </PaymentSummaryContainer>
      <StyledTitleText>Pagamento</StyledTitleText>
      <CreditCard/>
    </>
  );
}

