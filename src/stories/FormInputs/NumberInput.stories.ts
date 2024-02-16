import type { Meta, StoryObj } from '@storybook/svelte';

import NumberInput from '../../lib/components/Form/Input/NumberInput.svelte';

const meta = {
	title: 'FormInputs/NumberInput',
	component: NumberInput,
	tags: ['autodocs'],
	argTypes: {
		value: { control: 'number' },
		label: { control: 'text' },
		name: { control: 'number' },
		color: {
			control: 'select',
			options: ['primary', 'secondary', 'Theme1', 'Theme2', 'Theme3', 'Theme4', 'Theme5']
		},
		size: { control: 'text' },
		placeholder: { control: 'text' },
		labelPos: {
			control: 'select',
			options: ['left', 'right', 'top', 'bottom']
		},
		min: { control: 'number' },
		max: { control: 'number' },
		step: { control: 'number' },
		error: { control: 'text' },
		errorTimeOut: { control: 'number' },
		required: { control: 'boolean' },
		disabled: { control: 'boolean' },
		readonly: { control: 'boolean' },
		hideOperators: { control: 'boolean' },
		width: { control: 'text' },
		rounded: { control: 'boolean' },
		icon: { control: 'text' },
		iconRight: { control: 'boolean' },
		secret: { control: 'boolean' },
		info: { control: 'text' },
		inputType: { control: 'text' },
		loading: { control: 'boolean' },
		inputRef: { control: 'object' }
	}
} satisfies Meta<NumberInput>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Normal: Story = {
	args: {
		value: 0,
		label: 'Number input',
		name: 'number-input-1',
		color: 'primary',
		size: '1rem',
		placeholder: 'This is a placeholder',
		labelPos: 'top',
		inputmode: 'text',
		pattern: '',
		error: '',
		errorTimeOut: 0,
		required: false,
		disabled: false,
		readonly: false,
		hideOperators: false,
		width: '250px',
		rounded: false,
		icon: 'Number',
		iconRight: false,
		secret: false,
		info: 'This is a tooltip!',
		inputType: 'text',
		loading: false
	}
};
