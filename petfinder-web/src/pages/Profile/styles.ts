import styled from 'styled-components';
import { shade } from 'polished';
import signInBackgoundImg from '../../assets/backgroundLogin.jpg';

export const Container = styled.div`
  height: 100%;
  background: url(${signInBackgoundImg}) repeat top;
  background-attachment: fixed;
`;

export const Content = styled.div`
  display: flex;

  .details {
    padding: 40px;
    width: 700px;
    background-color: #f79641;
    border-radius: 20px;
    border: 1px solid #f79641;
    margin: 80px auto;

    h1 {
      color: #94443f;
      line-height: 46px;
      text-align: center;
    }

    form {
      margin: 80px auto;
      width: 340px;
      text-align: center;

      a {
        color: #f4ede8;
        display: block;
        margin-top: 24px;
        text-decoration: none;
        transition: color 0.2s;
        &:hover {
          color: ${shade(0.2, '#f4ede8')};
        }
      }
    }
  }
`;
