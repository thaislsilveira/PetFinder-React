import styled, { keyframes } from 'styled-components';

import { Link } from 'react-router-dom';

export const Container = styled.div`
  width: 100vw;
  height: 100vh;

  position: relative;
  display: flex;

  .map-popup {
    .leaflet-popup-tip-container {
      .leaflet-popup-tip {
        background: #e9c2af;
      }
    }
    .leaflet-popup-content-wrapper {
      background: #e9c2af;
      border-radius: 20px;
      box-shadow: none;
    }

    .leaflet-popup-content {
      a {
        width: 100%;
        height: 40px;
        background: #f79641;
        box-shadow: 17.2868px 27.6589px 41.4884px rgba(23, 142, 166, 0.16);
        border-radius: 12px;

        display: flex;
        justify-content: center;
        align-items: center;
      }

      .image-box {
        width: 100%;
        height: 180px;
        display: block;
        border-radius: 12px;
        background-size: cover;
        background-repeat: no-repeat;
        background-position: center;
        margin-bottom: 10px;
        img {
          display: none;
        }
      }
    }
  }
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

  footer button {
    width: 48px;
    height: 48px;

    border: 0;

    background: #ffd666;
    border-radius: 16px;

    cursor: pointer;

    transition: background-color 0.2s;

    display: flex;
    justify-content: center;
    align-items: center;
  }

  button:hover {
    background: #94443f;
  }
`;
