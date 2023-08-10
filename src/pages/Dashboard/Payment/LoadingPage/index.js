import styled from 'styled-components';
import Loader from 'react-loader-spinner';

export default function LoadingPage() {
  return (
    <LoadingContainer>
      <Loader type="TailSpin" height={120} width={120} />
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
