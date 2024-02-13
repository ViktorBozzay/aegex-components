import type { Meta, StoryObj } from '@storybook/svelte';

import Select from '../../lib//lib/components/Form/Input/Select.svelte';

const meta = {
	title: 'FormInputs/Select',
	component: Select,
	tags: ['autodocs'],
	argTypes: {
		options: { control: 'array' },
		label: { control: 'text' },
		size: { control: 'text' },
		maxSelectHeight: { control: 'text' },
		name: { control: 'text' },
		required: { control: 'boolean' },
		secret: { control: 'boolean' },
		disabled: { control: 'boolean' },
		readOnly: { control: 'boolean' }
	}
} satisfies Meta<Select>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Normal: Story = {
	args: {
		name: 'select-1',
		label: 'Select input',
		icon: 'Home',
		secret: false,
		options: [
			{ label: 'Option 1', value: 'value 1' },
			{ label: 'Option 2', value: 'value 2' },
			{ label: 'Option 3', value: 'value 3' }
		]
	}
};
