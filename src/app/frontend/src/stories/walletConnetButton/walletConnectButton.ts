import { Meta, StoryObj } from '@storybook/react';
import { WalletConnectionButton } from '../../components/walletConnectButton/walletConnectButton';

const meta: Meta<typeof WalletConnectionButton> = {
    title: "Components/UsernameField",
    component: WalletConnectionButton,
};

export default meta;
type Story = StoryObj<typeof WalletConnectionButton>;

export const Default: Story = {};