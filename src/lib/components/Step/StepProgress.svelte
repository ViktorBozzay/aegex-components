<script lang="ts">
  import Tooltip from "../Tooltip/Tooltip.svelte";

	export let steps: string[] = [];
  export let currentActive = 0;
  export let toolTipPosition: 'top' | 'bottom' | 'left' | 'right' = 'top';

	export const handleProgress = (stepIncrement: number) => {
    currentActive = stepIncrement;
	}

  $: progressStr = `--progress: ${currentActive / (steps.length - 1) * 100}%`;
</script>

<div
  class="progress-container"
  style={progressStr}
>
  {#each steps as step, i}
    <button
    class="circle {currentActive >= i ? 'active' : ''}"
    on:click={() => handleProgress(i)}
    >
      <Tooltip text={step} position={toolTipPosition}>
        <span>{i+1}</span>
      </Tooltip>
    </button>
	{/each}
</div>


<style lang="scss">
	.progress-container {
		display: flex;
		justify-content: space-between;
		position: relative;
		margin-bottom: 30px;
		max-width: 100%;
		width: 100%;

    &::before {
      content: '';
      background-color: var(--primary-shadow);
      position: absolute;
      top: 50%;
      left: 0.5rem;
      right: 0.5rem;
      max-width: calc(100% - 1rem);
      transition: all 0.3s ease;
      width: 100%;
      transform: translateY(-50%);
      height: 4px;
    }

    &::after {
      content: '';
      background-color: var(--success);
      position: absolute;
      top: 50%;
      left: 0.5rem;
      right: 0.5rem;
      max-width: calc(var(--progress) - 1rem);
      transition: all 0.3s ease;
      width: 100%;
      transform: translateY(-50%);
      height: 4px;
    }

    .progress {
      background-color: var(--success);
      position: absolute;
      top: 50%;
      left: 0;
      transform: translateY(-50%);
      height: 4px;
      width: 0%;
      z-index: -1;
      transition: 0.4s ease;
    }

    .circle {
      background-color: var(--primary-bg);
      color: var(--primary-text-600);
      border-radius: 50%;
      height: 30px;
      width: 30px;
      display: flex;
      align-items: center;
      justify-content: center;
      border: 3px solid var(--primary-shadow);
      transition: 0.4s ease;
      cursor: pointer;
      z-index: 1;
    }

    .circle::after{
      position: absolute;
      bottom: 35px;
      color: var(--primary-shadow);
      transition: 0.5s ease;
    }

    .circle.active::after {
      color: var(--success);
    }

    .circle.active {
      border-color: var(--success);
    }
	}
</style>