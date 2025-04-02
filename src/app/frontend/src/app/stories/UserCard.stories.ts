import React from 'react';
import { Meta, StoryFn } from '@storybook/react';
import UserCard, { UserCardProps } from '../components/UserCard/UserCard';

// Default export to define the component and its properties
export default {
  title: 'Components/UserCard', // Title in Storybook UI
  component: UserCard,
  argTypes: {
    // You can define props or arguments to be editable in Storybook
    username: { control: 'text' },
    userId: { control: 'text' },
  },
} as Meta;

// Template that renders the UserCard component with dynamic args
const Template: StoryFn<UserCardProps> = (args: React.JSX.IntrinsicAttributes & { username: string; userId?: string; }) => <UserCard {...args} />;

// Default story
export const Default = Template.bind({});
Default.args = {
  username: 'John Doe',
  userId: '1234',
};

// Story without userId
export const WithoutUserId = Template.bind({});
WithoutUserId.args = {
  username: 'Jane Smith',
};
