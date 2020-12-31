import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
`;

export const Content = styled.main`
  flex: 1;

  form {
    width: 700px;
    margin: 64px auto;

    background: #ffffff;
    border: 1px solid #d3e2e5;
    border-radius: 20px;

    padding: 64px 80px;

    overflow: hidden;

    margin-bottom: 40px;
    border: 1px solid #d3e2e5;
    border-radius: 20px;
  }

  fieldset {
    border: 0;
  }

  fieldset + fieldset {
    margin-top: 80px;
  }

  fieldset legend {
    width: 100%;

    font-size: 32px;
    line-height: 34px;
    color: #5c8599;
    font-weight: 700;

    border-bottom: 1px solid #d3e2e5;
    margin-bottom: 40px;
    padding-bottom: 24px;
  }

  .input-block + .input-block {
    margin-top: 24px;
  }

  .input-block label {
    display: flex;
    color: #8fa7b3;
    margin-bottom: 8px;
    line-height: 24px;
  }

  .input-block label span {
    font-size: 14px;
    color: #8fa7b3;
    margin-left: 24px;
    line-height: 24px;
  }

  .input-block input,
  .input-block textarea {
    width: 100%;
    background: #f5f8fa;
    border: 1px solid #d3e2e5;
    border-radius: 20px;
    outline: none;
    color: #5c8599;
  }

  .input-block input {
    height: 64px;
    padding: 0 16px;
  }

  .input-block textarea {
    min-height: 120px;
    max-height: 240px;
    resize: vertical;
    padding: 16px;
    line-height: 28px;
  }

  .input-block .images-container {
    display: grid;
    grid-template-columns: repeat(5, 1fr);
    grid-gap: 16px;
  }

  .input-block .images-container img {
    width: 100%;
    height: 96px;
    object-fit: cover;
    border-radius: 28px;
    border: 1px solid rgba(0, 0, 0, 0.05);
    box-shadow: inset 0 0 2px #fff, 0 0 12px rgba(0, 0, 0, 0.05);
  }

  .input-block .new-image {
    height: 96px;
    background: #f5f8fa;
    border: 1px dashed #96d2f0;
    border-radius: 20px;
    cursor: pointer;

    display: flex;
    justify-content: center;
    align-items: center;
  }

  .input-block input[type='file'] {
    visibility: hidden;
  }

  .input-block .button-select {
    display: grid;
    grid-template-columns: 1fr 1fr;
  }

  .input-block .button-select button {
    height: 64px;
    background: #f5f8fa;
    border: 1px solid #d3e2e5;
    color: #5c8599;
    cursor: pointer;
  }

  .input-block .button-select button.active {
    background: #edfff6;
    border: 1px solid #a1e9c5;
    color: #37c77f;
  }

  .input-block .button-select button.active.dont-open {
    background: linear-gradient(154.16deg, #fdf8f5 7.85%, #ffffff 91.03%);
    border: 1px solid #ffbcd4;
    color: #ff6690;
  }

  .input-block .button-select button:first-child {
    border-radius: 20px 0px 0px 20px;
  }

  .input-block .button-select button:last-child {
    border-radius: 0 20px 20px 0;
    border-left: 0;
  }

  button.confirm-button {
    margin-top: 64px;

    width: 100%;
    height: 64px;
    border: 0;
    cursor: pointer;
    background: #3cdc8c;
    border-radius: 20px;
    color: #ffffff;
    font-weight: 800;

    display: flex;
    justify-content: center;
    align-items: center;

    transition: background-color 0.2s;
  }

  button.confirm-button svg {
    margin-right: 16px;
  }

  button.confirm-button:hover {
    background: #36cf82;
  }
`;
