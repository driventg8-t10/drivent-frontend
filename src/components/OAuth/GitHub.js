import React from 'react';
import MuiButton from '@material-ui/core/Button';
import { FaGithub } from 'react-icons/fa';
import { styled } from '@material-ui/styles';

function GitHubButton({ ...props }) {
  return (
    <StyledButton {...props}>
      <FaGithub />
      <p>Login with GitHub</p>
    </StyledButton>
  );
}

const StyledButton = styled(MuiButton)(() => ({
  backgroundColor: '#333333',
  color: 'white',
  '&:hover': {
    backgroundColor: '#24292e',
  },
  marginTop: '5px',
  '& .MuiButton-label': {
    display: 'flex',
    gap: '10px',
    '& svg': {
      fontSize: '20px',
    },
  },
}));

export default GitHubButton;
