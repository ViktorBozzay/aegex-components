<script lang="ts">
	import { scale } from "svelte/transition";

  export let isFullscreen: boolean = false;

  // $: document.getElementsByTagName("body")[0].style.overflow = isFullscreen ? "hidden" : "auto";
</script>

<div
  class="fullscreen-wrapper"
  class:isFullscreen
  transition:scale
>
  <slot/>
</div>

<style lang="scss">
  .fullscreen-wrapper {
    transition: all 0.3s ease;
  }

  .isFullscreen {
    position: fixed;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    z-index: var(--fullscreen-z-index);
    transition: all 0.3s ease;
  }
</style>