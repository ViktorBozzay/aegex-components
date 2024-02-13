<script lang="ts">
	// import { onMount } from 'svelte';
  import TooltipComponent from './TooltipComponent/TooltipComponent.svelte';

  export let text: string | undefined = undefined;
  export let maxWidth: number | string = Infinity;
  export let position: 'top' | 'bottom' | 'left' | 'right' = 'top';
  export let size: string = "0.75rem";

  let elemRef: HTMLDivElement;
  let elemPos = { x: 0, y: 0 };

  // onMount(() => {
  //   if (elemRef) {
  //     const parentElem = elemRef.parentElement;
  //     const elemRect = elemRef.getBoundingClientRect();
  //     const parentPositionProp = getComputedStyle(parentElem as HTMLElement).position;

  //     if (parentPositionProp !== 'static') {
  //       elemPos.x = elemRect?.x;
  //       elemPos.y = elemRect?.y;
  //     }
  //   }
  // })

	let isHovered = false;
	let x: number;
	let y: number;

	const mouseOver = (event: MouseEvent) => {
		isHovered = true;
		x = event.pageX - elemPos?.x;
		y = event.pageY - elemPos?.y;

	}
	const mouseMove = (event: MouseEvent) => {
		x = event.pageX - elemPos?.x;
		y = event.pageY - elemPos?.y;
	}
	const mouseLeave = () => {
		isHovered = false;
	}
</script>

{#if text}
  <div
    role="tooltip"
    bind:this={elemRef}
    on:focus|preventDefault
    on:mouseover={mouseOver}
    on:mouseleave={mouseLeave}
    on:mousemove={mouseMove}
  >
    <slot />
  </div>
  {#if isHovered}
    <TooltipComponent
      {position}
      {maxWidth}
      {text}
      {size}
      {x}
      {y}
    />
  {/if}
{:else}
  <slot />
{/if}

<style lang="scss">
  div {
    cursor: help;
    margin: 0;
    padding: 0;
  }
</style>