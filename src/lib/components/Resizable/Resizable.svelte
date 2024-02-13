<script lang="ts">
  import { resize } from "../../actions/resize.js";
</script>

<div use:resize class="resizable-wrapper">
  <slot/>
</div>

<style lang="scss">
  .resizable-wrapper {
    padding: 1rem;
    overflow: hidden;
    border-radius: 0.25rem;
    box-shadow: 1px 2px 5px var(--primary-shadow);
  }
</style>