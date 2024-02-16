import type { Meta, StoryObj } from '@storybook/svelte';

import Password from '../../lib/components/Form/Input/Password.svelte';

const meta = {
	title: 'FormInputs/Password',
	component: Password,
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
		error: { control: 'text' },
		disabled: { control: 'boolean' },
		readonly: { control: 'boolean' },
		width: { control: 'text' },
		rounded: { control: 'boolean' },
		icon: { control: 'text' },
		iconRight: { control: 'boolean' },
		info: { control: 'text' },
		inputType: { control: 'text' },
		loading: { control: 'boolean' },
		inputRef: { control: 'object' }
	}
} satisfies Meta<Password>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Normal: Story = {
	args: {
		value: '',
		label: 'Password input',
		name: 'password-input-1',
		color: 'primary',
		size: '1rem',
		placeholder: 'This is a placeholder',
		labelPos: 'top',
		inputmode: 'text',
		pattern: '',
		error: '',
		disabled: false,
		readonly: false,
		width: '50%',
		rounded: false,
		icon: 'Password',
		iconRight: false,
		info: 'This is a tooltip!',
		inputType: 'text',
		loading: false
	}
};
