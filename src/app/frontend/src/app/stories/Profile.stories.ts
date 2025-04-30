import React from "react";
import { StoryObj, Meta } from "@storybook/react";
import Profile from "../components/Profile/Profile";

const meta = {
  title: "Pages/Profile",
  component: Profile,
  parameters: {
    layout: 'fullscreen',
  },
} satisfies Meta<typeof Profile>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const MobileView: Story = {
  parameters: {
    viewport: {
      defaultViewport: 'mobile1',
    },
  },
};