import React from "react";
import { Meta, StoryFn } from "@storybook/react";
import ClosedCardView from "../components/closedCardView/ClosedCardView";
import type { ClosedCardViewProps } from "../components/closedCardView/ClosedCardView";


export default {
  title: "Components/ClosedCardView",
  component: ClosedCardView,
  argTypes: {
    userReaction: {
      control: {
        type: "select",
        options: ["like", "dislike", null],
      },
    },
  },
} as Meta<typeof ClosedCardView>;

const Template: StoryFn<ClosedCardViewProps> = (args) => <ClosedCardView {...args} />;

export const Default = Template.bind({});
Default.args = {
  postId: "123",
  avatar: "https://via.placeholder.com/40",
  username: "JohnDoe",
  title: "My First Post",
  content: "This is a sample post content for Storybook testing.",
  initialLikes: 10,
  initialDislikes: 2,
  userReaction: null,
};
