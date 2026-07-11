import React from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { FiAlertCircle } from 'react-icons/fi';

import Tooltip from './index';

const meta = {
  title: 'Components/Tooltip',
  component: Tooltip,
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof Tooltip>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    title: 'Informação adicional',
    children: <FiAlertCircle size={20} />,
  },
};

export const ErrorVariant: Story = {
  args: {
    title: 'Campo obrigatório',
    variant: 'error',
    children: <FiAlertCircle size={20} color="#c53030" />,
  },
};
