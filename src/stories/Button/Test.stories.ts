import type { Meta, StoryObj } from '@storybook/svelte';

import TestButton from './TestComponents/TestButton.svelte';
import Decorator from './TestComponents/Decorator.svelte';

const meta: Meta<typeof TestButton> = {
	title: 'Test/Button',
	component: TestButton,
	tags: ['autodocs'],
	decorators: [() => Decorator]
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Test: Story = {};
