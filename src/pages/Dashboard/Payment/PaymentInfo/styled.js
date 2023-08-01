import { Typography } from '@material-ui/core';
import styled from 'styled-components';

export const PaymentInfoContainer = styled.div`

`;

export const StyledTypography = styled(Typography)`
  margin-bottom: 30px!important;
`;

export const StyledTitleText = styled(Typography)`
  font-weight: 400!important;
  font-size: 20px!important;
  line-height: 24px!important;
  margin-bottom: 20px!important;
  color: #8E8E8E;
`;

export const PaymentSummaryContainer = styled.div`
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

export const TitleSummary = styled(Typography)`
  font-weight: 400!important;
  font-size: 16px!important;
  line-height: 19px!important;
  margin-bottom: 10px!important;
  color: #454545;
`;

export const PriceSummary = styled(Typography)`
  font-weight: 400!important;
  font-size: 14px!important;
  line-height: 17px!important;
  color: #898989;
`;
