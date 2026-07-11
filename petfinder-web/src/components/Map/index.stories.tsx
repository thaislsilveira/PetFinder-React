import React from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';

import mapIcon from '../../utils/mapIcon';
import MapComponent from './index';

const meta = {
  title: 'Components/Map',
  component: MapComponent,
  parameters: {
    layout: 'padded',
  },
  decorators: [
    Story => (
      <div style={{ width: 480 }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof MapComponent>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    latitude: -20.161,
    longitude: -50.5385,
    icon: mapIcon,
  },
};
