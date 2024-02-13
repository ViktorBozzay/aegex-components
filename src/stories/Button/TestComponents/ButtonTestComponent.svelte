<script lang="ts">
  import Button from "../../../lib/components/Buttons/General/Button.svelte";

	export let type: 'button' | 'reset' | 'submit' | null | undefined = 'button';
	export let href: string = '';
	export let mode: string = '';
	export let color: Colors = 'primary';
  export let size: number = 16;
  export let loading: boolean = false;
  export let infoText: string = '';
  export let rounded: boolean = false;
  export let icon: string = '';
  export let iconRight: boolean = false;
	export let disabled = false;
  export let label: string = '';
</script>

<Button
  {label}
  {type}
  {href}
  {mode}
  {color}
  {size}
  {loading}
  {infoText}
  {rounded}
  {icon}
  {iconRight}
  {disabled}
  on:click
>
  Label
</Button>

