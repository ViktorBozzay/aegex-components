import type { Meta, StoryObj } from '@storybook/svelte';

import TextArea from '../../lib/components/Form/Input/TextArea.svelte';

const meta: Meta<TextArea> = {
	title: 'FormInputs/TextArea',
	component: TextArea,
	tags: ['autodocs'],
	argTypes: {
		label: { control: 'text' },
		value: { control: 'text' },
		placeholder: { control: 'text' },
		resize: {
			control: 'select',
			options: ['auto', 'vertical', 'horizontal', 'none', 'both']
		},
		readonly: { control: 'boolean' },
		disabled: { control: 'boolean' },
		labelPos: {
			control: 'select',
			options: ['top', 'left', 'bottom', 'right']
		},
		info: { control: 'text' },
		name: { control: 'text' },
		infoPos: {
			control: 'select',
			options: ['top', 'left', 'bottom', 'right']
		},
		loading: { control: 'boolean' },
		color: {
			control: 'select',
			options: [
				'primary',
				'secondary',
				'info',
				'success',
				'warning',
				'danger',
				'theme1',
				'theme2',
				'theme3',
				'theme4',
				'theme5'
			]
		}
	}
};

export default meta;
type Story = StoryObj<typeof meta>;

export const General: Story = {
	args: {
		label: 'Label',
		name: 'text-area-1',
		loading: false,
		value: '',
		placeholder: 'This is a placeholder',
		resize: 'auto',
		readonly: false,
		disabled: false,
		labelPos: 'top',
		info: '',
		infoPos: 'top',
		color: 'primary'
	}
};
