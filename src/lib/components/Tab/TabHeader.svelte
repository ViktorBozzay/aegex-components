<script lang="ts">
	export let tabs: string[] = [];
  export let currentActive = 0;
  export let toolTipPosition: 'top' | 'bottom' | 'left' | 'right' = 'top';

	export const handleProgress = (tabIncrement: number) => {
    currentActive = tabIncrement;
	}

  $: progressStr = `--progress: ${currentActive / (tabs.length - 1) * 100}%`;
</script>

<div
  class="tab-container"
>
  {#each tabs as tab, i}
    <button
      class="tab {currentActive === i ? 'active' : ''}"
      on:click={() => handleProgress(i)}
      style="--count: {i}"
    >
      {tab}
    </button>
	{/each}
</div>


<style lang="scss">
	.tab-container {
    position: relative;
    top: 1px;
    width: fit-content;

    .tab {
      position: relative;
      background-color: transparent;
      border: 1px solid var(--primary-border);
      border-bottom-color: transparent;
      border-radius: 0.5rem 0.5rem 0 0;
      color: var(--primary-text);
      background-color: var(--primary-bg);
      transition: all 0.3s ease;
      left: calc(-1px * var(--count));
      padding: 0.25rem 0.5rem;

      &:not(.active) {
        border: 1px solid var(--primary-border);
        background-color: var(--primary-border-900);
        color: var(--primary-text-400);
      }
    }

	}
</style>