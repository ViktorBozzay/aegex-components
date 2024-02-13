import type { Meta, StoryObj } from '@storybook/svelte';

import Icon from '../../lib/components/Icon/Icon.svelte';
import { iconList } from '../../lib/components/Icon/iconList.js';

const meta: Meta<Icon> = {
	title: 'Common/Icon',
	component: Icon,
	tags: ['autodocs'],
	argTypes: {
		icon: { control: 'select', options: Object.keys(iconList), defaultValue: 'Home' },
		size: { control: 'number' },
		rotate: { control: 'number' }
	}
};

export default meta;
type Story = StoryObj<typeof meta>;

export const General: Story = {
	args: {
		icon: 'Home',
		size: 16,
		rotate: 0
	}
};
