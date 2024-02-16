<script lang="ts">
</script>

<div class="scrollable-container">
  <div class="scrollable-content">
    <slot/>
  </div>
</div>

<style lang="scss">
  @import "../../styles/scrollbar.scss";

  .scrollable-container {
    height: 100%;
    width: 100%;
    overflow: auto;

    .scrollable-content {
      padding-right: 0.5rem;
      height: 100%;
      // overflow: hidden;

    }
  }
</style>