import type { Meta, StoryObj } from '@storybook/svelte';

import Popupmenu from './TestComponents/PopupmenuTestComponent.svelte';

const meta: Meta<Popupmenu> = {
	title: 'Common/Popupmenu',
	component: Popupmenu,
	tags: ['autodocs'],
	argTypes: {
		tooltipText: { control: 'text' },
		isOpen: { control: 'boolean' },
		zIndex: { control: 'number' }
	}
};

export default meta;
type Story = StoryObj<typeof meta>;

export const General: Story = {
	args: {
		tooltipText: 'Tooltip text',
		isOpen: false,
		zIndex: 10
	}
};
