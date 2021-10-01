import styled from 'styled-components';

export const Container = styled.aside`
  position: fixed;
  height: 100%;
  width: 150px;
  padding: 15px 0;
  background: linear-gradient(329.54deg, #f79641 0%, #f79641 100%);

  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;

  img {
    width: 100%;
  }

  footer a,
  footer button {
    width: 48px;
    height: 48px;

    border: 0;

    background: #fbdd5a;
    border-radius: 16px;

    cursor: pointer;

    transition: background-color 0.2s;

    display: flex;
    justify-content: center;
    align-items: center;
  }

  footer a:hover,
  button:hover {
    background: #94443f;
  }
`;
