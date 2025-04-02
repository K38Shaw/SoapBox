import React from "react";
import { Meta, StoryObj } from "@storybook/react";
import ProfileHeader from "../components/ProfileHeader/ProfileHeader";

const meta: Meta<typeof ProfileHeader> = {
  title: "Components/ProfileHeader",
  component: ProfileHeader,
  args: {
    avatarUrl: "https://via.placeholder.com/100",
    username: "John Doe",
    alias: "@johndoe",
  },
};

export default meta;
type Story = StoryObj<typeof ProfileHeader>;

export const Default: Story = {};
