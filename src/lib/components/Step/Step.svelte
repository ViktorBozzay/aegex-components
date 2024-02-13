<script lang="ts">
	import type { SvelteComponent } from "svelte";
	import { fade, slide } from "svelte/transition";

  import StepProgress from "./StepProgress.svelte";
	import Icon from "../Icon/Icon.svelte";

  export let steps: { title: string, component: SvelteComponent}[];
  export let currentActive = 0;
  export let toolTipPosition: 'top' | 'bottom' | 'left' | 'right' = 'top';
  export let showButtons = true;

  const stepTitles = steps.map(step => step.title);

  const handleChangeStep = (val: number) => {
    currentActive = Math.min(Math.max(currentActive + val, 0), steps.length - 1);
  }
</script>

<div class="step-container">
  <StepProgress
    bind:currentActive
    steps={stepTitles}
    {toolTipPosition}
  />
  {#each steps as step, i}
    {#if i === currentActive}
      <div
        transition:slide
        class="step-content"
      >
        <svelte:component this={step.component} />
      </div>
    {/if}
  {/each}
  {#if showButtons}
    <div class="step-buttons">
      <button
        on:click={()=>handleChangeStep(-1)}
        disabled={currentActive === 0}
      >
        <Icon icon="ArrowLeft" size="1.5rem"/>
      </button>
        <p>{steps[currentActive].title}</p>
      <button
        on:click={()=>handleChangeStep(1)}
        disabled={currentActive === steps.length - 1}
      >
        <Icon icon="ArrowRight" size="1.5rem"/>
      </button>
    </div>
  {/if}
</div>


<style lang="scss">

  .step-container {
    display: flex;
    flex-direction: column;

    .step-content {
    }

    .step-buttons {
      display: flex;
      justify-content: space-between;

      button {
        background-color: transparent;
        color: var(--primary-text);
        outline: 0;
        border: 0;
        cursor: pointer;
        transition: all 0.3s ease-in-out;

        &:hover {
          color: var(--primary-text-500);
        }

        &:disabled {
          color: var(--primary-text-700);
          cursor: not-allowed;
        }
      }
    }
  }

</style>
