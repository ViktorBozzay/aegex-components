import type { Meta, StoryObj } from '@storybook/svelte';

import Modal from '../../lib/components/Modal/Modal.svelte';

const meta: Meta<Modal> = {
	title: 'Common/Modal',
	component: Modal,
	tags: ['autodocs'],
	argTypes: {
		title: { control: 'text' },
		isOpen: { control: 'boolean' },
		closeOnEsc: { control: 'boolean' },
		closeOnBackdropClick: { control: 'boolean' },
		draggable: { control: 'boolean' },
		position: {
			control: 'select',
			options: [
				'center',
				'top-left',
				'top-center',
				'top-right',
				'bottom-left',
				'bottom-center',
				'bottom-right'
			]
		}
	}
};

export default meta;
type Story = StoryObj<typeof meta>;

export const General: Story = {
	args: {
		title: 'Modal Title',
		isOpen: true,
		closeOnEsc: true,
		closeOnBackdropClick: false,
		draggable: true,
		position: 'center'
	}
};
