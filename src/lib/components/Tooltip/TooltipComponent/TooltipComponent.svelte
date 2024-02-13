<script lang="ts">
  import { fade } from 'svelte/transition';
	import { portal } from '../../../actions/portal.js';

	export let text: string = "";
  export let position: 'top' | 'bottom' | 'left' | 'right' = 'top';
  export let maxWidth: number | string = Infinity;
  export let size: string = "0.75rem";
	export let x: number;
	export let y: number;

  let tooltip: HTMLElement;
  let styleStr = ""

  $: {
    if (tooltip) {
      const { width, height } = tooltip.getBoundingClientRect();
      switch (position) {
        case 'top':
          styleStr = `
            --arrow-left: calc(50% - 4px);
            --arrow-top: 100%;
            --arrow-border-color:  var(--primary-bg) transparent transparent  transparent;
            top: calc(${ y - height }px - 1rem);
            left: ${ x - width / 2 }px;`
          break;
        case 'bottom':
          styleStr = `
            --arrow-left: calc(50% - 4px);
            --arrow-bottom: 100%;
            --arrow-border-color:   transparent transparent var(--primary-bg) transparent;
            top: ${ y + height / 2 }px;
            left: ${ x - width / 2 }px;`
        break;
        case 'left':
          styleStr = `
            --arrow-left: 100%;
            --arrow-top: calc(50% - 6px);
            --arrow-border-color: transparent transparent transparent var(--primary-bg);transparent;
            top: ${ y - height / 2 }px;
            left: ${ x - width - 16 }px;`
          break;
        case 'right':
          styleStr = `
            --arrow-left: -5px;
            --arrow-top: calc(50% - 5px);
            --arrow-border-color: transparent var(--primary-bg) transparent transparent;
            top: ${ y - height / 2 }px;
            left: ${ x + 16 }px;`
          break;
      }
    }
  }
</script>

<div
  use:portal={"tooltip"}
  bind:this={tooltip}
  in:fade={{duration: 300, delay: 100}}
  out:fade={{duration: 75}}
  style={`
    ${styleStr}
    max-width: ${typeof maxWidth === 'number'
      ? `${maxWidth}px`
      : maxWidth };
    font-size: ${size};
    padding: calc(${size} * 0.25) calc(${size} * 0.5);
    --arrow-size: calc(${size} * 0.25);
    `}
>
  <p>{text}</p>
  <slot/>
</div>

<style lang="scss">
	div {
		box-shadow: 1px 2px 5px var(--primary-shadow);
		background: var(--primary-bg);
		border-radius: 0.25rem;
		position: absolute;
    z-index: var(--tooltip-z-index);

    p {
      margin: 0;
      padding: 0;
    }

    &::after {
      content: '';
      position: absolute;
      width: 0;
      height: 0;
      border-width: var(--arrow-size);
      border-style: solid;
      left: var(--arrow-left);
      top: var(--arrow-top);
      bottom: var(--arrow-bottom);
      border-color: var(--arrow-border-color);
    }
	}
</style>
