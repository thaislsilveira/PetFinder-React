import styled from 'styled-components';
import signInBackgoundImg from '../../assets/backgroundLogin.jpg';

export const Container = styled.div`
  display: flex;
  flex: 1;
  background: url(${signInBackgoundImg}) repeat center;
  background-attachment: fixed;
`;

export const Content = styled.main`
  flex: 1;

  .pet-details {
    padding: 40px;
    width: 700px;
    margin: 64px auto;
    overflow: hidden;
    background-color: #f7f3eb;
    border-radius: 20px;
    border: 1px solid #eddfd2;

    > img {
      width: 100%;
      height: 300px;
      object-fit: cover;
      border-radius: 20px;
    }

    .images {
      display: grid;
      grid-template-columns: repeat(6, 1fr);
      column-gap: 16px;

      margin: 20px 0 0;

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

    .pet-details-content {
      margin: 20px 0 0;

      h2 {
        color: #94443f;
        font-size: 18px;
        line-height: 46px;
      }

      p {
        padding: 20px;
        line-height: 28px;
        font-size: 18px;
        color: #94443f;
        border-radius: 20px;
        background-color: #f79641;
      }

      .phone {
        border: 0;
        font-size: 18px;
        color: #94443f;
        border-radius: 20px;
        background-color: #f79641;
      }
    }
    .leaflet-container {
      border-radius: inherit;
    }

    .map-container {
      margin-top: 64px;
      background: #f79641;
      border: 1px solid #f79641;
      border-radius: 20px;

      footer {
        padding: 20px 0;
        text-align: center;
      }

      footer a {
        line-height: 24px;
        color: #94443f;
        text-decoration: none;
      }
    }

    .type-details {
      margin-top: 24px;
      padding-right: 5px;

      display: inline-block;
      grid-template-columns: 1fr 1fr;
      column-gap: 20px;

      div {
        padding: 32px 24px;
        border-radius: 20px;
        line-height: 28px;
      }

      div svg {
        display: block;
        margin-bottom: 20px;
      }

      div.type-sex {
        width: 264px;
        background: linear-gradient(154.16deg, #d3d3d3 7.85%, #ffffff 91.03%);
        border: 1px solid #a9a9a9;
        color: #808080;
      }
      div.type-animal {
        width: 264px;
        background: linear-gradient(154.16deg, #ffdead 7.85%, #ffffff 91.03%);
        border: 1px solid #f4a460;
        color: #d2691e;
      }
    }
  }
`;
