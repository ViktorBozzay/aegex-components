import type { Meta, StoryObj } from '@storybook/svelte';

import MovableTestComponent from './TestComponents/MovableTestComponent.svelte';

const meta: Meta<MovableTestComponent> = {
	title: 'Common/Movable',
	component: MovableTestComponent,
	tags: ['autodocs'],
	argTypes: {
		alwaysOnScreen: { control: 'boolean' },
		addPlaceholder: { control: 'boolean' },
		moveWithResize: { control: 'boolean' },
		addReset: { control: 'boolean' }
	}
};

export default meta;
type Story = StoryObj<typeof meta>;

export const General: Story = {
	args: {
		alwaysOnScreen: false,
		addPlaceholder: false,
		moveWithResize: false,
		addReset: false
	}
};
