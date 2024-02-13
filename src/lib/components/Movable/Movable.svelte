<script lang="ts">
	import { move } from "../../actions/move.js";

  export let alwaysOnScreen = false;
  export let addPlaceholder = true;
  export let moveWithResize = true;
  export let addReset = true;
</script>

<!-- svelte-ignore a11y-no-static-element-interactions -->
<div
  use:move={{alwaysOnScreen, addPlaceholder, moveWithResize, addReset }}
  class="movable-wrapper"
>
  <div
    class="grabber"
  >
    <slot name="grabber"></slot>
  </div>
  <slot/>
</div>

<style lang="scss">
</style>
