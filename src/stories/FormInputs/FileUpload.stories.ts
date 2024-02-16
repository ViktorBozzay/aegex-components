import type { Meta, StoryObj } from '@storybook/svelte';

import FileUpload from '../../lib/components/Form/Input/FileUpload.svelte';

const meta = {
	title: 'FormInputs/FileUpload',
	component: FileUpload,
	tags: ['autodocs'],
	argTypes: {
		multiple: { control: 'boolean' },
		accept: { control: 'array' },
		error: { control: 'text' }
	}
} satisfies Meta<FileUpload>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Normal: Story = {
	args: {}
};
