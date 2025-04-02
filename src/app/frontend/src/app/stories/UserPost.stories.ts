import React from "react";
import { Meta, StoryFn } from "@storybook/react";
import UserPosts from "../components/UserPosts/UserPosts";

export default {
  title: "Components/UserPosts",
  component: UserPosts,
} as Meta;

const Template: StoryFn = () => <UserPosts />;

export const Default = Template.bind({});
