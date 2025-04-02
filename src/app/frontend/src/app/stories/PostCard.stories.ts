import React from "react";
import { Meta, StoryObj } from "@storybook/react";
import PostCard from "../components/PostCard/PostCard";

const meta: Meta<typeof PostCard> = {
  title: "Components/PostCard",
  component: PostCard,
  tags: ["autodocs"],
  args: {
    topic: "Technology",
    imageUrl: "https://via.placeholder.com/150",
  },
};

export default meta;
type Story = StoryObj<typeof PostCard>;

export const Default: Story = {};
