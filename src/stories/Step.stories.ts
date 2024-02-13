import type { Meta, StoryObj } from '@storybook/svelte';

// import Step from './TestComponents/StepTest.svelte';
import Step from '../lib/components/Step/Step.svelte';
import TestComponent1 from './TestComponents/TestStepComponent1.svelte';
import TestComponent2 from './TestComponents/TestStepComponent2.svelte';
import TestComponent3 from './TestComponents/TestStepComponent3.svelte';

const meta: Meta<Step> = {
	title: 'Common/Step',
	component: Step,
	tags: ['autodocs'],
	argTypes: {
		steps: { control: 'array' }
	}
};

export default meta;
type Story = StoryObj<typeof meta>;

export const General: Story = {
	args: {
		steps: [
			{ title: 'Step 1', component: TestComponent1, arg: 123 },
			{ title: 'Step 2', component: TestComponent2, arg: 321 },
			{ title: 'Step 3', component: TestComponent3, arg: 534 }
		]
	}
};
