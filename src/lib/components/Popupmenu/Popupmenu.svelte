<script lang="ts">
  import { fade } from 'svelte/transition';

  import Tooltip from '../Tooltip/Tooltip.svelte';

	import { clickOutside } from '../../actions/clickOutside.js';

  export let tooltipText: string | undefined = undefined;
  export let tooltipPosition: "top" | "right" | "left" | "bottom" = "bottom";
  export let isOpen = false;
  export let position: "top-right" | "top-left" | "bottom-right" | "bottom-left" = "bottom-left";

  export let zIndex = 10;

  const positionsStr = {
    "bottom-left": `
      --popup-position-top: 100%;
      --popup-position-left: 0;
      --popup-position-bottom: unset;
      --popup-position-right: unset;
      `,
    "bottom-right": `
      --popup-position-top: 100%;
      --popup-position-left: unset;
      --popup-position-bottom: unset;
      --popup-position-right: 0;
    `,
    "top-left": `
      --popup-position-top: unset;
      --popup-position-left: 0;
      --popup-position-bottom: 100%;
      --popup-position-right: unset;
    `,
    "top-right": `
      --popup-position-top: unset;
      --popup-position-left: unset;
      --popup-position-bottom: 100%;
      --popup-position-right: 100%;
    `,
  }
</script>

<div class="popupmenu-container"
  style={`--z-index: ${zIndex}; ${positionsStr[position]}`}
  use:clickOutside
  on:outsideClick={() => isOpen = false}
>


<!-- TODO how to add this onclick to the activator, to remove the isOpen state form the popupmenu's parent -->
<!-- on:click={() => isOpen = !isOpen} -->
  <Tooltip
    text={tooltipText}
    position={tooltipPosition}
  >
    <slot
      name="activator"
    />
  </Tooltip>
  {#if isOpen}
    <div
      class="popupmenu-wrapper"
      transition:fade={{duration: 200}}
    >
      <slot name="menu"/>
    </div>
  {/if}
</div>

<style lang="scss">
  .popupmenu-container{
    z-index: var(--z-index);
    position: relative;

    .popupmenu-wrapper {
      background-color: var(--primary-bg);
      box-shadow: 1px 2px 5px var(--primary-shadow);
      padding: 0.5rem 1rem;
      border-radius: 0.25rem;
      position: absolute;
      top: var(--popup-position-top);
      left: var(--popup-position-left);
      bottom: var(--popup-position-bottom);
      right: var(--popup-position-right);
    }
  }
</style>