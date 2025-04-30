import React from "react";
import { StoryObj, Meta } from "@storybook/react";
import UserCard from "../components/UserCard/UserCard";

const meta = {
  title: "Components/UserCard",
  component: UserCard,
  argTypes: {
    username: { control: 'text' },
    userId: { control: 'text' },
  },
} satisfies Meta<typeof UserCard>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    username: 'John Doe',
    userId: '1234',
  },
};

export const WithoutUserId: Story = {
  args: {
    username: 'Jane Smith',
  },
};