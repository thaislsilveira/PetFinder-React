import React from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';

import Logo, { LogoIcon } from './index';

const meta = {
  title: 'Components/Logo',
  component: Logo,
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof Logo>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    width: 180,
  },
};

export const Icon: Story = {
  render: () => <LogoIcon size={64} />,
};
