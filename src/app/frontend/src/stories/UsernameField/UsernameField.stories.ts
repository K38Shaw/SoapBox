import { Meta, StoryObj } from '@storybook/react';
import { UsernameField } from '../../components/UsernameField/UsernameField';

const meta: Meta<typeof UsernameField> = {
    title: "Components/UsernameField",
    component: UsernameField,
};

export default meta;
type Story = StoryObj<typeof UsernameField>;

export const Default: Story = {
    
};