import type { Meta, StoryObj } from "@storybook/react";
import PostCard from "../../app/components/PostCard/PostCard";

const meta: Meta<typeof PostCard> = {
  title: "Components/PostCard",
  component: PostCard,
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof PostCard>;

export const Default: Story = {
  args: {
    topic: "Topic:",
    body: "This is a preview of a user-created post. Only the first two lines will be shown before cutting off.",
    imageUrl: "/Bannana.jpeg",
    onViewFull: () => alert("Viewing full post..."),
  },
};
