import styled from 'styled-components';
import MuiButton from '@material-ui/core/Button';
import Input from '../../../../components/Form/Input';
import Chip from '../../../../assets/images/chip.png'; 
import { useForm } from '../../../../hooks/useForm';
import { toast } from 'react-toastify';
import InfoValidations from './InfoValidations';
import { ErrorMsg } from '../../../../components/PersonalInformationForm/ErrorMsg';
import useToken from '../../../../hooks/useToken';
import { payTicket } from '../../../../services/payment-infoApi';
import { Typography } from '@material-ui/core';
import { useNavigate } from 'react-router-dom';

export default function CreditCard({ updateTicketPage, ticketId }) {
  const token = useToken();
  const navigate = useNavigate();
  const {
    handleSubmit,
    handleChange,
    data,
    errors,
  } = useForm({
    validations: InfoValidations,

    onSubmit: async(data) => {
      const cardIssuer = getCreditCardIssuer(data.card);

      const body = {
        ticketId: ticketId,
        cardData: {
          issuer: cardIssuer,  
          number: parseInt(data.card?.replaceAll(' ', '')),
          name: data.name,  
          expirationDate: data.valid, 
          cvv: parseInt(data.cvc)
        }
      };
      try {
        await payTicket(body, token);
        toast('Pagamento realizado com sucesso!');
        // navigate('/dashboard/payment/confirmed');
        updateTicketPage();
      } catch (err) {
        toast('Não foi possível salvar suas informações!');
      }
    },

    initialValues: { card: '', name: '', valid: '', cvc: '' },
  });

  function getCreditCardIssuer(cardNumber) {
    const trimmedNumber = cardNumber.replace(/\s/g, '');

    if (/^4/.test(trimmedNumber)) {
      return 'Visa';
    } else if (/^5/.test(trimmedNumber)) {
      return 'MasterCard';
    } else if (/^3[47]/.test(trimmedNumber)) {
      return 'American Express (Amex)';
    } else if (/^6(?:011|5|4[4-9]|22(?:1(?:2[6-9]|[3-9]\d)|[2-8]\d\d|9(?:[01]\d|2[0-5])))|7(?:[0-9]{2})/.test(trimmedNumber)) {
      return 'Discover';
    } else if (/^3(?:0[0-5]|[68])/.test(trimmedNumber)) {
      return 'Diners Club';
    } else if (/^35(?:2[89]|[3-8]\d)/.test(trimmedNumber)) {
      return 'JCB';
    } else {
      return 'Desconhecida';
    }
  }

  return (
    <form onSubmit={handleSubmit}> 
      <CreditInfoContainer>
        <CreditCardPlaceholder>
          <img src={Chip} alt="Chip"/>
          <NumberContainer> <h4 > {data?.card || '•••• •••• •••• ••••'} </h4> </NumberContainer>
          <div>
            <h5>{data?.name.toUpperCase() || 'YOUR NAME HERE'}</h5>
            <ValidContainer>
              <h6>valid thru</h6>
              <p>{data?.valid || '••/••'}</p>
            </ValidContainer>
          </div>

        </CreditCardPlaceholder>   

        <InputContainer>
          <Input
            label="Card Number"
            name = "number"
            type= "text"
            fullWidth
            value= {data?.card || ''}
            maxLength="16"
            mask='9999 9999 9999 9999'
            onChange={handleChange('card')}
          />
          <StyledEgText>E.g.: 49..., 51..., 36..., 37...</StyledEgText>
          {errors.card && <ErrorMsg>{errors.card}</ErrorMsg>}
          
          <Input
            label="Name"
            name = "name"
            type = "text"
            fullWidth
            onChange={handleChange('name')}
            value= {data?.name || ''}
          />
          {errors.name && <ErrorMsg>{errors.name}</ErrorMsg>} 

          <InputWrapper>
            <div>
              <Input
                label="Valid Thru"
                name = "valid"
                type = "text"
                fullWidth
                onChange={handleChange('valid')}
                value= {data?.valid || ''}
                mask='99/99'
              />
              {errors.valid && <ErrorMsg>{errors.valid}</ErrorMsg>} 
            </div>

            <div>
              <Input
                label="CVC"
                name = "cvc"
                type = "text"
                maxLength="3"
                mask='999'
                onChange={handleChange('cvc')}
                value= {data?.cvc || ''}
              />
              {errors.cvc && <ErrorMsg>{errors.cvc}</ErrorMsg>} 
            </div>

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
    width: 190px;
    color: white;
    font-size: 15px;
    font-family: Arial, Helvetica, sans-serif;
    margin-right: 10px;
    padding-bottom: 2px;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
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
    flex-direction: column;
    >div:first-child{
    margin-right:0px;
    width: 100%;
  }
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
    font-size: 25px;
    font-family: Arial, Helvetica, sans-serif;
  }
`;

const ValidContainer = styled.div`
  color: white;
  font-size: 16px;
  font-family: Arial, Helvetica, sans-serif;
  overflow: hidden;
  white-space: nowrap;

  >h6{
  font-size: 12px; 
  overflow: hidden;
white-space: nowrap;
  }
  >p{
    margin-top: 3px;
    text-align: center;
    font-size: 17px;
  }
`;

const StyledEgText = styled(Typography)`
  font-weight: 300!important;
  font-size: 15px!important;
  line-height: 24px!important;
  padding-left: 2px;
  color: #8E8E8E;
`;

