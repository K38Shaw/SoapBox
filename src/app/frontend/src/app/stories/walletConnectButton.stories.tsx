import React from 'react';
import { WalletConnectionButton } from "../../components/walletConnectButton/walletConnectButton";
import { WalletConnectionStatus } from '@/app/Services';
import { Meta, StoryObj } from '@storybook/react';

const meta: Meta<typeof WalletConnectionButton> = {
  title: 'Wallet/WalletConnectionButton',
  component: WalletConnectionButton,
};

export default meta;

type Story = StoryObj<typeof WalletConnectionButton>;

const createMockWallet = (status: WalletConnectionStatus) => ({
  connectToWallet: async () => status,
});

// Happy Path - Success
export const Success: Story = {
  render: () =>
    React.createElement(WalletConnectionButton, {
      wallet: createMockWallet(WalletConnectionStatus.success),
    }),
};

// Sad Path - Missing Wallet
export const MissingWallet: Story = {
  render: () =>
    React.createElement(WalletConnectionButton, {
      wallet: createMockWallet(WalletConnectionStatus.missingWallet),
    }),
};

// Sad Path - User Declined
export const UserDeclined: Story = {
  render: () =>
    React.createElement(WalletConnectionButton, {
      wallet: createMockWallet(WalletConnectionStatus.declined),
    }),
};
