import type { Meta, StoryObj } from '@storybook/svelte';

import Toggle from '../../lib/components/Form/Input/Toggle.svelte';

const meta = {
	title: 'FormInputs/Toggle',
	component: Toggle,
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
} satisfies Meta<Toggle>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Normal: Story = {
	args: {
		label: 'Checkbox 1',
		checked: false,
		id: 'checkbox-1',
		name: 'checkbox-1',
		size: '1rem'
	}
};
