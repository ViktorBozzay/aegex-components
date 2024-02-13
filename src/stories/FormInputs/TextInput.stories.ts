import type { Meta, StoryObj } from '@storybook/svelte';

import TextInput from '../../lib//lib/components/Form/Input/TextInput.svelte';

const meta = {
	title: 'FormInputs/TextInput',
	component: TextInput,
	tags: ['autodocs'],
	argTypes: {
		size: { control: 'text' },
		value: { control: 'text' },
		label: { control: 'text' },
		name: { control: 'text' },
		color: {
			control: 'select',
			options: ['primary', 'secondary', 'Theme1', 'Theme2', 'Theme3', 'Theme4', 'Theme5']
		},
		placeholder: { control: 'text' },
		labelPos: {
			control: 'select',
			options: ['left', 'right', 'top', 'bottom']
		},
		inputmode: {
			control: 'select',
			options: ['text', 'decimal', 'numeric', 'tel', 'url']
		},
		pattern: { control: 'text' },
		error: { control: 'text' },
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
		infoPos: { control: 'select', options: ['top', 'bottom', 'left', 'right'] },
		inputType: { control: 'select', options: ['text', 'number', 'password', 'email', 'url'] },
		loading: { control: 'boolean' },
		inputRef: { control: 'object' }
	}
} satisfies Meta<TextInput>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Normal: Story = {
	args: {
		value: '',
		label: 'Text input',
		name: 'text-input-1',
		color: 'primary',
		size: '1rem',
		placeholder: 'This is a placeholder',
		labelPos: 'top',
		inputmode: 'text',
		pattern: '',
		error: '',
		required: false,
		disabled: false,
		readonly: false,
		hideOperators: false,
		width: '250px',
		rounded: false,
		icon: 'Home',
		iconRight: false,
		secret: false,
		info: 'This is a tooltip!',
		inputType: 'text',
		loading: false
	}
};
