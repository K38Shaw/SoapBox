import { Meta, StoryObj } from '@storybook/react';
import { MetaMaskButton } from '../../components/MetaMaskButton/MetaMaskButton';

const meta: Meta<typeof MetaMaskButton> = {
    title: "Components/MetaMaskButton",
    component: MetaMaskButton,
};

export default meta;
type Story = StoryObj<typeof MetaMaskButton>;

export const Default: Story = {
    
};