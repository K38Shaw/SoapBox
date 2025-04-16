import { Meta, StoryObj } from '@storybook/react';
import { PasswordField } from '../../components/PasswordField/PasswordField';

const meta: Meta<typeof PasswordField> = {
    title: "Components/PasswordField",
    component: PasswordField,
};

export default meta;
type Story = StoryObj<typeof PasswordField>;

export const Default: Story = {
    
};