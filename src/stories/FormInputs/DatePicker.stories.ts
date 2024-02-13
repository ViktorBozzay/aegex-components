import type { Meta, StoryObj } from '@storybook/svelte';

import DatePicker from '../../lib/components/Form/Input/DatePicker.svelte';

const meta = {
	title: 'FormInputs/DatePicker',
	component: DatePicker,
	tags: ['autodocs'],
	argTypes: {
		label: { control: 'text' },
		id: { control: 'text' },
		name: { control: 'text' },
		size: {
			control: 'text'
		},
		infoPos: { control: 'select', options: ['top', 'bottom', 'left', 'right'] }
	}
} satisfies Meta<DatePicker>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Normal: Story = {
	args: {
		label: 'DatePicker 1',
		id: 'DatePicker-1',
		name: 'DatePicker-1',
		size: '1rem'
	}
};
