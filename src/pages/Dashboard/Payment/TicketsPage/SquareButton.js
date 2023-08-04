import styled from 'styled-components';

export default function SquareButton(props) {
  const { text, price, isSelected, onClick = null, plusChar = false, disabled = false } = props;
  return (
    <StyledButton onClick={onClick} isSelected={isSelected} disabled={disabled}>
      <p>{text}</p>
      <span>
        {plusChar && '+ '}R$ {price}
      </span>
    </StyledButton>
  );
}

const StyledButton = styled.button`
  width: 145px;
  height: 145px;
  border-radius: 20px;
  display: flex;
  flex-direction: column;
  gap: 3px;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  background-color: ${(props) => (props.isSelected ? '#FFEED2' : '#ffffff')};
  border: ${(props) => (props.isSelected ? 'none' : '1px solid #cecece')};

  p {
    color: #454545;
    text-align: center;
    font-family: Roboto;
    font-size: 16px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
  }

  span {
    color: #898989;
    text-align: center;
    font-family: Roboto;
    font-size: 14px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
  }
`;
