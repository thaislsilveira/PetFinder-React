import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  min-height: 100vh;
`;

export const Content = styled.main`
  flex: 1;

  .pet-details {
    width: 700px;
    margin: 64px auto;

    background: #ffffff;
    border: 1px solid #d3e2e5;
    border-radius: 20px;

    overflow: hidden;

    > img {
      width: 100%;
      height: 300px;
      object-fit: cover;
    }

    .images {
      display: grid;
      grid-template-columns: repeat(6, 1fr);
      column-gap: 16px;

      margin: 16px 40px 0;

      button {
        border: 0;
        height: 88px;
        background: none;
        cursor: pointer;
        border-radius: 20px;
        overflow: hidden;
        outline: none;

        opacity: 0.6;

        &:active {
          opacity: 1;
        }

        img {
          width: 100%;
          height: 88px;
          object-fit: cover;
        }
      }
    }
  }
`;
