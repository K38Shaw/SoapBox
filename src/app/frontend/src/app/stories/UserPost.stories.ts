import React from "react";
import { StoryObj, Meta } from "@storybook/react";
import UserPosts from "../components/UserPosts/UserPosts";

const meta = {
  title: "Components/UserPosts",
  component: UserPosts,
} satisfies Meta<typeof UserPosts>;

export default meta;

type Story = StoryObj<typeof meta>;

// Use StoryObj instead of StoryFn
export const Default: Story = {};