<script lang="ts">
  import Icon from '../../Icon/Icon.svelte';

  export let action: () => void;
  export let opacity = 0.5;

  let opacityCSSVar = `--opacity-css-var: ${opacity};`;
</script>

<button on:click={action} style={opacityCSSVar}>
	<Icon icon="Reset" />
</button>

<style lang="scss">
	button {
    position: absolute;
    bottom: 1.25rem;
    right: 0.25rem;
    display: flex;
    align-items: center;
    justify-content: center;
		font-size: 1rem;
    padding: 0;
    margin: 0;

		background-color: transparent;
		opacity: var(--opacity-css-var);
		border: none;
		cursor: pointer;
		transition: opacity 0.2s ease;

		&:hover {
			opacity: 1;
		}
	}
</style>
