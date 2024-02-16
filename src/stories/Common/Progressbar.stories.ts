import type { Meta, StoryObj } from '@storybook/svelte';

import Progressbar from '../../lib/components/Progressbar/Progressbar.svelte';

const meta: Meta<Progressbar> = {
	title: 'Common/Progressbar',
	component: Progressbar,
	tags: ['autodocs'],
	argTypes: {
		progression: { control: 'number' },
		label: { control: 'text' },
		showValue: { control: 'boolean' },
		thickness: { control: 'text' },
		labelInside: { control: 'boolean' }
	}
};

export default meta;
type Story = StoryObj<typeof meta>;

export const General: Story = {
	args: {
		label: '',
		showValue: true,
		thickness: '1rem',
		labelInside: false
	}
};
