import type {Meta, StoryObj} from "@storybook/svelte";

import TestComponent from '../lib/components/TestComponent/TestComponent.svelte';

const meta = {
  title: "TestComponent",
  component: TestComponent,
  tags: ["autodocs"],
  argTypes: {},
} satisfies Meta<TestComponent>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {},
};
