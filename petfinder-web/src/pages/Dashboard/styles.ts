import styled from 'styled-components';

import background from '../../assets/background.svg';

export const Container = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const Content = styled.div`
  position: relative;

  width: 100%;
  max-width: 1100px;

  height: 100%;
  max-height: 600px;

  display: flex;
  align-items: flex-start;
  flex-direction: column;
  justify-content: space-between;

  background-image: url(${background});
  background-repeat: no-repeat;
  background-size: 600px;
  background-position-x: 400px;
  background-position-y: 250px;

  main {
    max-width: 350px;
  }

  main h1 {
    font-size: 76px;
    font-weight: 900;
    line-height: 70px;
  }

  p {
    margin-top: 40px;
    font-size: 24px;
    line-height: 34px;
  }

  a {
    position: absolute;

    right: 0;
    bottom: 0;

    width: 80px;
    height: 80px;
    background: #ffd666;
    border-radius: 30px;

    display: flex;
    align-items: center;
    justify-content: center;

    transition: background-color 0.2s;
  }

  a:hover {
    background: #94443f;
  }
`;

export const Location = styled.div`
  position: absolute;
  margin: 30px 10px;

  right: 0;
  top: 0;

  font-size: 24px;
  line-height: 34px;

  display: flex;
  flex-direction: column;

  text-align: right;

  strong {
    text-align: center;
    font-weight: 800;
  }
`;
