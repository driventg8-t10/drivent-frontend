import styled from 'styled-components';

export default function UnregisteredUser() {
  return (
    <UnregisteredContainer>
      <h2>Ingresso e pagamento</h2>
      <TextContainer>
        <h1>
          Você precisa completar sua inscrição antes <br /> de prosseguir pra escolha de ingresso
        </h1>
      </TextContainer>
    </UnregisteredContainer>
  );
}

const UnregisteredContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  h2 {
    font-family: Roboto;
    font-size: 34px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
  }
`;

const TextContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  h1 {
    color: #8e8e8e;
    font-family: Roboto;
    font-size: 20px;
    font-weight: 400;
    line-height: 23px;
    letter-spacing: 0em;
    text-align: center;
  }
`;
