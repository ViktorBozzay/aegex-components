<script lang="ts">

	import Tooltip from '../../Tooltip/Tooltip.svelte';
  import Icon from "../../Icon/Icon.svelte";
	import type { Colors } from '../../../types/Colors.js';

	export let type: 'button' | 'reset' | 'submit' | undefined = 'button';
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

  let styleStr: string;
  $: styleStr = `
    --rounded: ${rounded ? `calc(1rem + ${size}px)` : '0.25rem'};
    --font-size: ${size}px;`;

  $: disabled = disabled || loading;
</script>

<Tooltip text={infoText}>
  {#if href}
    <a
      href={disabled ? "#" : href}
      class="{mode} {color}"
      class:disabled
      style={styleStr}
    >
      {#if !iconRight && icon}
        {#if loading}
          <Icon icon="Loading" {size} inline/>
        {:else}
          <Icon icon={icon} {size} inline/>
        {/if}
      {/if}

      <slot />

      {#if iconRight && icon}
        {#if loading}
          <Icon icon="Loading" {size} inline/>
        {:else}
          <Icon icon={icon} {size} inline/>
        {/if}
      {/if}
    </a>
  {:else}
    <button
      class="{mode, color}"
      style={styleStr}
      {type}
      {disabled}
      on:click
    >
      {#if !iconRight && icon}
        {#if loading}
          <Icon icon="Loading" {size} inline/>
        {:else}
          <Icon icon={icon} {size} inline/>
        {/if}
      {/if}

      <slot />

      {#if iconRight && icon}
        {#if loading}
          <Icon icon="Loading" {size} inline/>
        {:else}
          <Icon icon={icon} {size} inline/>
        {/if}
      {/if}
    </button>
  {/if}
</Tooltip>

<style lang="scss">
	button,
	a {
		background-color: var(--primary-bg);
		color: var(--primary-text);
    font-size: var(--font-size);
		padding: 0.5rem 1rem;
    display: inline-block;
		border-radius: var(--rounded);
		cursor: pointer;
		text-decoration: none;
    outline: none;
    border: none;
		box-shadow: 1px 2px 3px var(--primary-shadow);
    transition: all 0.3s ease;
	}

	button:hover,
	button:active,
	a:hover,
	a:active {
    // TODO: how to deal with themes and colors
		background: var(--bg-dark-5);
		border-color: var(--bg-dark-5);
		color: var(--bg-dark-1);
		box-shadow: 1px 1px 8px var(--primary-shadow);
    transition: all 0.3s ease;
	}

  .disabled,
  .disabled:hover,
	button:disabled,
	button:disabled:hover,
	button:disabled:active {
		background-color: var(--disabled-bg);
		color: var(--disabled-text);
		box-shadow: 1px 1px 2px var(--primary-shadow);
		cursor: not-allowed;
	}
</style>
