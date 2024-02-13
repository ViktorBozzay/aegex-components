<script lang="ts">
	import Digit from './Digit.svelte'

	export let value: number = 0;
	export let size: string = "1rem"

	$: digits = value?.toString()?.split('')?.map(Number) ?? ["0"];
</script>

<div class="digits" style="--size: {size}">
	{#each digits as digit, i (digits.length-i)}
		<Digit number={digit}/>
	{/each}
</div>

<style lang="scss">
	.digits {
		display: inline-flex;
		justify-content: center;
		align-items: center;
		overflow: hidden;
	}
</style>