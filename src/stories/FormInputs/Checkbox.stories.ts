import type { Meta, StoryObj } from '@storybook/svelte';

import Checkbox from '../../lib/components/Form/Input/Checkbox.svelte';

const meta = {
	title: 'FormInputs/Checkbox',
	component: Checkbox,
	tags: ['autodocs'],
	argTypes: {
		label: { control: 'text' },
		checked: { control: 'boolean' },
		threeState: { control: 'boolean' },
		id: { control: 'text' },
		name: { control: 'text' },
		size: {
			control: 'text'
		},
		infoPos: { control: 'select', options: ['top', 'bottom', 'left', 'right'] }
	}
} satisfies Meta<Checkbox>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Normal: Story = {
	args: {
		label: 'Checkbox 1',
		checked: false,
		threeState: false,
		id: 'checkbox-1',
		name: 'checkbox-1',
		size: '1rem'
	}
};

export const ThreeStated: Story = {
	args: {
		label: 'Checkbox 2',
		checked: false,
		threeState: true,
		id: 'checkbox-2',
		name: 'checkbox-2',
		size: '1rem'
	}
};
