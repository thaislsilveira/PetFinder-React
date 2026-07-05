import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';

import Form from '../../utils/unformCompat';
import Input from '.';

describe('Input', () => {
  it('applies a different container class when focused', () => {
    render(
      <Form onSubmit={() => {}}>
        <Input name="email" placeholder="E-mail" />
      </Form>,
    );

    const input = screen.getByPlaceholderText('E-mail');
    const container = screen.getByTestId('input-container');

    const classNameBeforeFocus = container.className;

    fireEvent.focus(input);

    expect(container.className).not.toBe(classNameBeforeFocus);
  });
});
