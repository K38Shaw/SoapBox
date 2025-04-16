import { Meta, StoryObj } from "@storybook/react";
import { ContinueButton } from "../../components/ContinueButton/ContinueButton"

const meta: Meta<typeof ContinueButton> = {
    title: "Components/ContinueButton",
    component: ContinueButton,
};

export default meta;
type Story = StoryObj<typeof ContinueButton>;

export const Default: Story = {};

