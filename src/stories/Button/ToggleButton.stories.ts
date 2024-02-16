import type { Meta, StoryObj } from '@storybook/svelte';

import ToggleButton from '../../lib/components/Buttons/ToggleButton/ToggleButton.svelte';

const meta = {
	title: 'Button/ToggleButton',
	component: ToggleButton,
	tags: ['autodocs'],
	argTypes: {
		label: { control: 'text' },
		checked: { control: 'boolean' },
		id: { control: 'text' },
		name: { control: 'text' },
		size: {
			control: 'text'
		},
		options: { control: 'array' },
		infoPos: { control: 'select', options: ['top', 'bottom', 'left', 'right'] }
	}
} satisfies Meta<ToggleButton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Normal: Story = {
	args: {
		label: 'Checkbox 1',
		checked: true,
		id: 'checkbox-1',
		name: 'checkbox-1',
		size: '1rem'
	}
};
