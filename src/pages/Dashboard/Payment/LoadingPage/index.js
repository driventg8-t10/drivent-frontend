import styled from 'styled-components';
import { TailSpin } from 'react-loader-spinner';

export default function LoadingPage() {
  return (
    <LoadingContainer>
      <TailSpin color="#eee" height={50} width={120} />
    </LoadingContainer>
  );
}

const LoadingContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;
