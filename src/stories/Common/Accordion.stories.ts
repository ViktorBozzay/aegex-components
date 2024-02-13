import type { Meta, StoryObj } from '@storybook/svelte';

import Accordion from './TestComponents/AccordionTest.svelte';

const meta: Meta<Accordion> = {
	title: 'Common/Accordion',
	component: Accordion,
	tags: ['autodocs'],
	argTypes: {}
};

export default meta;
type Story = StoryObj<typeof meta>;

export const General: Story = {
	args: {}
};
