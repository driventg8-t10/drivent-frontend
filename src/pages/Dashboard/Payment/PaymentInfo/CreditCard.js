import { Typography } from '@material-ui/core';
import styled from 'styled-components';
import MuiButton from '@material-ui/core/Button';
import Input from '../../../../components/Form/Input';
import Chip from '../../../../assets/images/chip.png'; 

export default function CreditCard() {
  return (
    <form>
      <CreditInfoContainer>
      
        <CreditCardPlaceholder>
          <img src={Chip} alt="Chip"/>
          <NumberContainer> <h4 > •••• ••7• 5••• ••••</h4> </NumberContainer>
          <div>
            <h5>YOUR NAME HERE</h5>
            <ValidContainer>
              <h6>valid thru</h6>
              <p>••/••</p>
            </ValidContainer>
          </div>

        </CreditCardPlaceholder>   

        <InputContainer>
          <Input
            label="Card Number"
            name = "number"
            fullWidth

          />
          <Input
            label="Name"
            name = "name"
            fullWidth
          />

          <InputWrapper>
            <Input
              label="Valid Thru"
              name = "valid"
            />

            <Input
              label="CVC"
              name = "cvc"
            />
          </InputWrapper>
          
        </InputContainer>
    
      </CreditInfoContainer>
      <StyledMuiButton variant='contained' type="submit">FINALIZAR PAGAMENTO</StyledMuiButton> 
    </form>
  );
}

const CreditInfoContainer = styled.div`
  width: 90%;
  height: 225px;
  
  display: flex;
  align-items: center;
  @media (max-width: 600px) {
    display: flex;
    flex-direction: column;
    height: 100%;
    width: 90%;
    margin-bottom: 10px;
    align-items: start;

  }
`;

const CreditCardPlaceholder = styled.div`
  background-color: #929292;
  min-height: 190px;
  height: 190px;
  min-width: 290px;
  border-radius: 15px;
  padding: 18px 20px 0px 25px;
  > img {
    width: 45px;
  }
  >div:nth-child(3){
    display: flex;
    justify-content: space-between;
    align-items: end;
  }
  h5{
    color: white;
    font-size: 35;
    font-family: Arial, Helvetica, sans-serif;
    margin-right: 10px;
    padding-bottom: 2px;
  }

  @media (max-width: 600px) {
    margin-bottom: 10px;
  }
`;

const StyledMuiButton = styled(MuiButton)`
  margin-top: 8px !important;
`;

const InputContainer = styled.div`
  width: 100%;
  margin-left: 30px;
  @media (max-width: 600px) {
    margin-left: 0px;
}
`;

const InputWrapper = styled.div`
  display: flex;
  width: 100%;
  >div:first-child{
    margin-right: 30px;
    width: 100%;
  }
  @media (max-width: 600px) {

  }
`;

const NumberContainer = styled.div` 
  display: flex;
  align-items: center;
  margin-top: 19px;
  margin-bottom: 15px;
  >h4 {
    line-height: 35px;
    color: white;
    font-size: 34px;
    font-family: Arial, Helvetica, sans-serif;
  }
`;

const ValidContainer = styled.div`
  color: white;
  font-size: 16px;
  font-family: Arial, Helvetica, sans-serif;
  >h6{
    font-size: 12px;
  }
  >p{
    margin-top: 3px;
    text-align: center;
    font-size: 22px;
  }
`;
