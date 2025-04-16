import { Meta, StoryObj } from '@storybook/react';
import { LoginWithGoogle } from '../../components/LoginWithGoogle/LoginWithGoogle';

const meta: Meta<typeof LoginWithGoogle> = {
    title: "Components/LoginWithGoogle",
    component: LoginWithGoogle,
};

export default meta;
type Story = StoryObj<typeof LoginWithGoogle>;

export const Default: Story = {
    
};