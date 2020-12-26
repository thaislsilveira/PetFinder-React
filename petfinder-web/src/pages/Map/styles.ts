import styled, { keyframes } from 'styled-components';

import { Link } from 'react-router-dom';

export const Container = styled.div`
  width: 100vw;
  height: 100vh;

  position: relative;
  display: flex;
`;

const appearFromLeft = keyframes`
from {
  opacity: 0;
  transform: translatex(-50px);
} to{

  opacity: 1;
  transform: translatex(0);

}
`;

export const AnimationContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  animation: ${appearFromLeft} 1s;

  width: 440px;
  background: #f79641;
  padding: 80px;

  justify-content: space-between;

  h2 {
    font-size: 40px;
    font-weight: 800;

    line-height: 42px;
    margin-top: 64px;
  }

  p {
    margin-right: 28px;
    margin-top: 24px;
  }

  footer {
    display: flex;
    flex-direction: column;

    line-height: 24px;
  }

  footer strong {
    font-weight: 800;
  }
`;

export const LinkAnimal = styled(Link)`
  position: absolute;
  right: 40px;
  bottom: 40px;

  z-index: 10;

  width: 64px;
  height: 64px;
  background: #ffd666;
  border-radius: 20px;

  display: flex;
  justify-content: center;
  align-items: center;

  transition: background-color 0.2s;

  &:hover {
    background: #94443f;
  }
`;
