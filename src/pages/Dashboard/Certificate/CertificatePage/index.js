import axios from 'axios';
import styled from 'styled-components';
import { getCertificate } from '../../../../services/certificateApi';
import useToken from '../../../../hooks/useToken';
import { toast } from 'react-toastify';

export default function CertificatePage() {
  const token = useToken();

  async function generateCertificate() {
    try {
      await getCertificate(token);
      toast('Download do certificado será iniciado em instantes...');
    } catch (err) {
      if (err.message === 'Request failed with status code 403') {
        toast('Você não participou de pelo menos 5 atividades durante o evento');
      }
    }
  }

  return (
    <CertificateContainer>
      <h1>Certificado</h1>
      <p>Clique no botão abaixo para gerar seu certificado de participação.</p>
      <button onClick={generateCertificate}>GERAR CERTIFICADO</button>
    </CertificateContainer>
  );
}

const CertificateContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  gap: 23px;

  h1 {
    color: #000000;
    font-family: Roboto;
    font-size: 34px;
    letter-spacing: 0.2px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
    margin-bottom: 10px;
  }

  p {
    color: #8e8e8e;
    font-family: Roboto;
    font-size: 20px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
  }

  button {
    width: 175px;
    height: 37px;
    border: none;
    border-radius: 4px;
    background-color: #e0e0e0;
    box-shadow: 0px 2px 10px 0px rgba(0, 0, 0, 0.25);
    color: #000000;
    text-align: center;
    font-family: Roboto;
    font-size: 14px;
    font-style: normal;
    font-weight: 500;
    line-height: normal;
    cursor: pointer;
  }
`;
