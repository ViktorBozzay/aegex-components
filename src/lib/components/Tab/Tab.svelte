<script lang="ts">
	import type { SvelteComponent } from "svelte";

  import TabHeader from "./TabHeader.svelte";
	import { fade, slide } from "svelte/transition";
	import Icon from "../Icon/Icon.svelte";

  export let tabs: { title: string, component: SvelteComponent}[];
  export let currentActive = 0;
  export let toolTipPosition: 'top' | 'bottom' | 'left' | 'right' = 'top';

  const tabTitles = tabs.map(Tab => Tab.title);

  const handleChangeTab = (val: number) => {
    currentActive = Math.min(Math.max(currentActive + val, 0), tabs.length - 1);
  }
</script>

<div class="tab-container">
  <TabHeader
    bind:currentActive
    tabs={tabTitles}
    {toolTipPosition}
  />
  {#each tabs as Tab, i}
    {#if i === currentActive}
      <div
        class="tab-content"
      >
        <svelte:component this={Tab.component} />
      </div>
    {/if}
  {/each}
</div>


<style lang="scss">

  .tab-container {
    display: flex;
    flex-direction: column;

    .tab-content {
      padding: 0.5rem 1rem;
      border: 1px solid var(--primary-border);
      border-radius: 0 0.5rem 0.5rem 0.5rem;
      box-shadow: 1px 2px 3px var(--primary-shadow);
    }
  }

</style>
