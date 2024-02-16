import type { Meta, StoryObj } from '@storybook/svelte';

import Button from '../../lib/components/Buttons/General/Button.svelte';

const meta: Meta<Button> = {
	title: 'Button/General',
	component: Button,
	tags: ['autodocs'],
	argTypes: {
		size: { control: 'number', min: 8, max: 32, step: 1 },
		disabled: { control: 'boolean' },
		rounded: { control: 'boolean' },
		type: { control: 'select', options: ['button', 'submit', 'reset'] },
		infoText: { control: 'text' },
		icon: { control: 'text' },
		iconRight: { control: 'boolean' },
		color: {
			control: 'select',
			options: [
				'primary',
				'secondary',
				'success',
				'danger',
				'warning',
				'info',
				'light',
				'dark',
				'theme1, theme2',
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
		size: 16,
		disabled: false,
		icon: 'Home',
		rounded: false,
		infoText: 'Info'
	}
};

export const Loading: Story = {
	args: {
		size: 16,
		disabled: false,
		loading: true,
		icon: 'Home',
		rounded: false,
		infoText: 'Info'
	}
};

export const Disabled: Story = {
	args: {
		size: 16,
		disabled: true,
		icon: 'Home',
		rounded: false,
		infoText: 'Info'
	}
};

export const LinkButton: Story = {
	args: {
		size: 16,
		href: 'http://svelte.dev',
		disabled: false,
		icon: 'Home',
		rounded: false,
		infoText: 'Info'
	}
};
