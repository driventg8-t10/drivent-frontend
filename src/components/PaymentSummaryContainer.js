import styled from 'styled-components';
import { Typography } from '@material-ui/core';

export default function PaymentSummaryContainer({ info }) {
  return (
    <PaymentSummaryBox>
      <TitleSummary>{info.remote === 'Online' ? info.remote : info.remote + ' ' + info.hotel}</TitleSummary>
      <PriceSummary> {info.price}</PriceSummary>
    </PaymentSummaryBox>
  );
}

const PaymentSummaryBox = styled.div`
    min-width: 290px;
    width: 290px;
    min-height: 108px;
    background-color: #FFEED2;

    display: flex;
    flex-direction: column;
    justify-content:center;
    align-items: center;
    border-radius: 20px;
    margin-bottom: 25px;
`;

const TitleSummary = styled(Typography)`
  font-weight: 400!important;
  font-size: 16px!important;
  line-height: 19px!important;
  margin-bottom: 10px!important;
  color: #454545;
`;

const PriceSummary = styled(Typography)`
  font-weight: 400!important;
  font-size: 14px!important;
  line-height: 17px!important;
  color: #898989;
`;
