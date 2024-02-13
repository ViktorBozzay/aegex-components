<script lang="ts">
  import Step from '../../lib/components/Step/Step.svelte';
  import TestComponent1 from './TestStepComponent1.svelte';
  import TestComponent2 from './TestStepComponent2.svelte';
  import TestComponent3 from './TestStepComponent3.svelte';
</script>

<Step steps={
  [
    {title: "Step 1", component: TestComponent1, arg: 123},
    {title: "Step 2", component: TestComponent2, arg: 321},
    {title: "Step 3", component: TestComponent3, arg: 534},
  ]}
/>