import type { Meta, StoryObj } from '@storybook/svelte';

import ScrollableContainer from './TestComponents/ScrollableContainerTest.svelte';

const meta: Meta<ScrollableContainer> = {
	title: 'Common/ScrollableContainer',
	component: ScrollableContainer,
	tags: ['autodocs'],
	argTypes: {
		maxHeight: {
			control: 'text'
		}
	}
};

export default meta;
type Story = StoryObj<typeof meta>;

export const General: Story = {
	args: {
		maxHeight: '180px'
	}
};
