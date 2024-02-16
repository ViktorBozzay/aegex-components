<script lang="ts">
	import Icon from "../../../Icon/Icon.svelte";

</script>

<button class="close-button" on:click>
  <Icon icon="Close"/>
</button>

<style lang="scss">
  .close-button {
    position: absolute;
    padding: 0;
    margin: 0;
    top: 0.25rem;
    right: 0.25rem;
    background-color: transparent;
    border: none;
    font-size: 1rem;
    opacity: 0.5;
    cursor: pointer;
    transition: opacity 0.2s ease;

    &:hover {
      opacity: 1;
    }
  }
</style>