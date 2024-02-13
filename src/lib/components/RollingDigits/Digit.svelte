<script lang="ts">
	export let number: number = 0;
</script>

<div class="container" style="--offset: calc(-{number} * var(--size))">
	{#each Array(10) as _, i}
		<div class="digit" class:active={i==number}>{i}</div>
	{/each}
</div>

<style lang="scss">
	.container {
		display: inline-flex;
		flex-direction: column;
		text-align: center;
    position: relative;
		height: var(--size);
		font-size: var(--size);
		top: var(--offset);
		transition: top 0.5s cubic-bezier(0.85, 0, 0.15, 1);

    .digit {
      transition: opacity 0.5s ease-in;
      opacity: 0.2;
    }
    .active {
      opacity: 1
    }
	}
</style>