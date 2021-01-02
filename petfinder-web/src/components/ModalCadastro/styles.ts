import styled, { css, keyframes } from 'styled-components';

interface ContainerProps {
  visible: boolean;
}

interface ModalProps {
  visibleEffect: boolean;
}

export const Container = styled.div<ContainerProps>`
  background: rgba(0, 0, 0, 0.5);
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0;
  left: 0;
  display: ${props => (props.visible ? 'block' : 'none')};
  justify-content: center;
  align-items: center;
  z-index: 100;
  overflow: auto;
`;

const modalEffect = keyframes`
    from {
      opacity: 0;
      transform: translateY(-60px)
    } to {
      opacity: 1;
      transform: translateY(0)
    }
  `;

export const Modal = styled.div<ModalProps>`
  ${props =>
    props.visibleEffect &&
    css`
      animation: ${modalEffect} 0.3s;
    `}
`;

export const Content = styled.main`
  flex: 1;

  form {
    width: 700px;
    margin: 64px auto;

    background: #fff;
    border: 1px solid #f79641;
    border-radius: 20px;

    padding: 64px 80px;

    overflow: hidden;

    margin-bottom: 40px;
    border: 1px solid #f79641;
    border-radius: 20px;
    position: relative;

    button.button-close {
      position: absolute;
      right: 16px;
      top: 15px;
      opacity: 0.6;
      border: 0;
      background: transparent;
      color: inherit;
    }

    button.button-close svg {
      color: #c53030;
    }
  }

  fieldset {
    border: 0;
  }

  fieldset + fieldset {
    margin-top: 80px;
  }

  fieldset legend {
    width: 100%;

    text-align: center;
    font-size: 32px;
    line-height: 34px;
    color: #ffd666;
    font-weight: 700;

    border-bottom: 1px solid #94443f;
    margin-bottom: 40px;
    padding-bottom: 24px;
  }

  .input-block + .input-block {
    margin-top: 24px;
  }

  .input-block label {
    font-size: 18px;
    display: flex;
    color: #94443f;
    margin-bottom: 8px;
    line-height: 24px;
  }

  .input-block input,
  .input-block textarea {
    width: 100%;
    background: #ffe7d3;
    border: 1px solid #ffe7d3;
    border-radius: 20px;
    outline: none;
    color: #94443f;
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
    background: #ffe7d3;
    border: 1px dashed #94443f;
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
    height: 40px;
    border: 1px solid #a3a4a9;
    background: #f6f6f4;
    color: #a3a4a9;
    cursor: pointer;
  }

  .input-block .button-select button.active {
    background: #edfff6;
    border: 1px solid #a1e9c5;
    color: #37c77f;
  }

  .input-block .button-select button.active.dont-open {
    background: #edfff6;
    border: 1px solid #a1e9c5;
    color: #37c77f;
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
