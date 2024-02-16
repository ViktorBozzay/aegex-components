<script lang="ts">
  import Tooltip from '../../Tooltip/Tooltip.svelte';
  import Icon from '../../Icon/Icon.svelte';
	import { multiplySize } from '../../../utils/multiplySize.js';

  export let size: string = "1rem";
  export let infoText: string = "";
  export let infoPos: 'top' | 'bottom' | 'left' | 'right' = 'top';
  export let noShadow = false;
  export let icon: string = ""

  $: styleStr = `
    --shadow-color: ${noShadow ? 'transparent' : 'var(--primary-shadow)'};
    width: ${size};
    height: ${size};
    font-size: calc(${size} * 0.75);`
</script>

<Tooltip text={infoText} position={infoPos}>
  <button style={styleStr}
      on:click
    >
      {#if icon !== ""}
        <Icon {icon} size={multiplySize(size, 0.75)} />
      {:else}
        <slot />
      {/if}
  </button>
</Tooltip>

<style lang="scss">
  button {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    border-radius: 50%;
    padding: 0.25rem;
    box-shadow: 1px 2px 5px var(--shadow-color);
    background-color: transparent;
    border: none;
    outline: none;
    cursor: pointer;
    color: var(--primary);
    background-color: var(--primary-bg);
    transition: transform 0.2s ease-in-out;
    transform-origin: center center;

    &:hover {
      transform: scale(1.1);
    }
  }
</style>