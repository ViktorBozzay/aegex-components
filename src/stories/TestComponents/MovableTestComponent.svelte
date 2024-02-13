<script lang="ts">
  import Movable from "../../lib/components/Movable/Movable.svelte";

  export let alwaysOnScreen = false;
  export let addPlaceholder = true;
  export let moveWithResize = true;
  export let addReset = true;
</script>

<Movable
  {alwaysOnScreen}
  {addPlaceholder}
  {moveWithResize}
  {addReset}
>
  <div class="grabber" slot="grabber">Grab me here!</div>
  <div class="content">Content</div>
</Movable>

<style lang="scss">
  .grabber {
    background-color: pink;
  }

  .content {
    background-color: lightblue;
  }
</style>