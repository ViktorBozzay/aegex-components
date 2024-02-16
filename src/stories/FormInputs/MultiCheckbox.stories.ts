import type { Meta, StoryObj } from '@storybook/svelte';

import Multicheckbox from '../../lib/components/Form/Input/Multicheckbox.svelte';

const meta = {
	title: 'FormInputs/MultiCheckbox',
	component: Multicheckbox,
	tags: ['autodocs'],
	argTypes: {
		size: { control: 'text' },
		options: {
			control: 'array'
		},
		hasControls: {
			control: 'boolean'
		},
		hasFilter: {
			control: 'boolean'
		}
	}
} satisfies Meta<Multicheckbox>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Normal: Story = {
	args: {
		options: [
			{
				label: 'Option 1',
				value: 1,
				selected: false
			},
			{
				label: 'Option 2',
				value: 2,
				selected: false
			},
			{
				label: 'Option 3',
				value: 3,
				selected: false
			},
			{
				label: 'Option 4',
				value: 4,
				selected: false
			},
			{
				label: 'Option 5',
				value: 5,
				selected: false
			}
		],
		hasControls: { control: 'boolean' },
		hasFilter: { control: 'boolean' },
		size: '1rem',
		maxHeight: '100%'
		// label: 'MultiCheckbox 1',
		// checked: false,
		// threeState: false,
		// id: 'multicheckbox-1',
		// name: 'multicheckbox-1',
	}
};

export const ThreeStated: Story = {
	args: {
		options: [],
		selected: [],
		hasControls: false,
		hasFilter: false,
		size: '1rem',
		maxHeight: '100%'
	}
};
