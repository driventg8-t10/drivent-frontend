import styled from 'styled-components';

export default function UnfinishedEvent() {
  return (
    <UnfinishedContainer>
      <h1>Certificado</h1>
      <p>O certificado ficará disponível apenas 1 dia após a realização do evento.</p>
    </UnfinishedContainer>
  );
}

const UnfinishedContainer = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  h1 {
    position: absolute;
    top: 0;
    left: 0;
    color: #000000;
    letter-spacing: 0.2px;
    font-family: Roboto;
    font-size: 34px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
  }
  p {
    color: #8e8e8e;
    text-align: center;
    font-family: Roboto;
    font-size: 20px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
  }
`;
