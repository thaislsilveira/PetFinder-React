import React from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { FiMail } from 'react-icons/fi';

import Form from '../../utils/unformCompat';
import Input from './index';

const meta = {
  title: 'Components/Input',
  component: Input,
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof Input>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    name: 'email',
    placeholder: 'E-mail',
    icon: FiMail,
  },
  render: args => (
    <Form onSubmit={() => {}} style={{ width: 320 }}>
      <Input {...args} />
    </Form>
  ),
};

export const WithError: Story = {
  args: {
    name: 'email-error',
    placeholder: 'E-mail',
    icon: FiMail,
  },
  render: args => (
    <Form
      onSubmit={() => {}}
      style={{ width: 320 }}
      ref={formHandles => {
        formHandles?.setFieldError(args.name, 'E-mail inválido');
      }}
    >
      <Input {...args} />
    </Form>
  ),
};
