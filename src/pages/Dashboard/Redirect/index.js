import React, { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import Loader from 'react-loader-spinner';

import EventInfoContext from '../../../contexts/EventInfoContext';
import gitHubApi from '../../../services/githubApi';
import UserContext from '../../../contexts/UserContext';
import { toast } from 'react-toastify';

function Redirect() {
  const { eventInfo } = useContext(EventInfoContext);
  const navigate = useNavigate();

  const { setUserData } = useContext(UserContext);

  useEffect(async() => {
    const urlSearch = new URLSearchParams(window.location.search);
    const code = urlSearch.get('code');

    if (!code) navigate('/sign-in');

    try {
      const response = await gitHubApi.postCode(code);
      setUserData(response.data);
      toast('Login realizado com sucesso!');
      navigate('/dashboard');
    } catch (error) {
      navigate('/sign-in');
      toast('Ocorreu um erro ao fazer login, tente novamente mais tarde');
    }
  }, []);

  return (
    <Container background={eventInfo.backgroundImageUrl}>
      <Loader type="TailSpin" color="white" height={120} width={120} />
    </Container>
  );
}

const Container = styled.div`
  background: ${(props) => props.background};
  background-size: cover;
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export default Redirect;
