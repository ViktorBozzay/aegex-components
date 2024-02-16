<script lang="ts">
  import { v4 as uuid } from 'uuid';

  import Icon from '../../Icon/Icon.svelte';
	import InputLabel from './InputLabel.svelte';
	import InputError from './InputError.svelte';

  import { inputStyles } from "./constants/inputStyles.js";

  import { validateDimensionStyle } from "../../../utils/validateDimensionStyle.js";

  import type { Colors } from '../../../types/Colors.js'; //TODO fix import herehere

  export let id = uuid();
  export let value: string = "";
  export let label: string = "";
  export let labelPos: "left" | "right" | "top" | "bottom" = "top";
  export let name: string;
  export let placeholder: string = "";
  export let size: string = "1rem";
  export let width: string = "100%";
  //TODO: find out how to deal with colors
  export let color: Colors = 'primary';
  export let inputmode: "text" | "decimal" | "numeric" | "tel" | "url" = "text";
  export let inputType: string = "text";
  export let pattern: string | undefined = undefined;
  export let icon: string = "";
  export let iconRight: boolean = false;
  export let info: string = "";
  export let infoPos: 'top' | 'bottom' | 'left' | 'right' = 'top';
  export let error: string = "";
  export let errorTimeOut = 5000;
  export let secret: boolean = false;
  export let required: boolean = false;
  export let disabled: boolean = false;
  export let readonly: boolean = false;
  export let hideOperators: boolean = false;
  export let rounded: boolean = false;
  export let loading = false;
  export let isOpen: boolean = false;
  export let inputRef: HTMLInputElement | undefined = undefined;

  if (!name) throw new Error("Name is required for <TextInput />");
  if (!validateDimensionStyle(width))
    throw new Error("Invalid width dimension style for <TextInput />");

  let showContent = !secret;

  $: disabled = loading || disabled;

  // TODO: maybe need to refactor it to using classes if it is possible? This is very ugly, i don't like it...
  let styleStr = "";
  $: styleStr = `
    --font-size: ${size};
    --flex-direction: ${inputStyles[labelPos].flexDir };
    --label-margin: ${inputStyles[labelPos].lblMargin};
    --width: ${width};
    --height: calc(${size} * 2);
  `;

  const handleFocus = ()=> inputRef && inputRef?.focus?.();
  const handleSecret = ()=> {
    if (disabled || readonly || loading) return;
    showContent = !showContent;
  }
</script>

<div class="field-container" style={styleStr}>
  <div class="input-container">
    <InputLabel {label} {required} {info} {id} {size} {infoPos} {error} {disabled}/>
    <div
      class="input-wrapper"
      class:error
      class:isOpen
      class:rounded
      class:disabled
      class:readonly
    >
      {#if icon}
        <button
          class:iconRight
          class="icon-wrapper decorator"
          on:click|preventDefault={handleFocus}
        >
          {#if loading}
            <Icon icon="Loading" {size} />
          {:else}
            <Icon icon={icon} {size} />
          {/if}
        </button>
      {/if}
      <input
        type="text"
        class="input-field"
        class:secret={!showContent}
        class:iconRight
        autocomplete="off"
        bind:this={inputRef}
        bind:value
        on:focus
        on:change
        on:input
        {placeholder}
        {inputmode}
        {pattern}
        {name}
        {id}
        {required}
        {readonly}
        {disabled}
      />
      {#if secret}
        <button
          class="secret-wrapper decorator"
          on:click|preventDefault={handleSecret}
        >
          {#if !showContent}
            <Icon icon="Show" {size} />
          {:else}
            <Icon icon="Hide" {size} />
          {/if}
        </button>
      {/if}
      {#if inputType === "select" && !hideOperators}
        <slot />
      {/if}
      {#if inputType === "number" && !hideOperators}
        <slot />
      {/if}
    </div>
  </div>
  <InputError bind:error {size} timeOut={errorTimeOut}/>
</div>

<style lang="scss">
  @import './styles/decorator.scss';

  .field-container {
    display: inline-flex;
    flex-direction: column;
    margin: 0;
    transition: all 0.2s ease;
    width: var(--width);

    .input-container {
      display: inline-flex;
      flex-direction: var(--flex-direction);
      transition: all 0.2s ease;

      .input-wrapper {
        display: inline-flex;
        align-items: center;
        overflow: hidden;
        width: 100%;
        height: var(--height);
        background-color: var(--primary-bg);
        border: 1px solid var(--primary-border);
        box-shadow: 1px 2px 5px var(--primary-shadow);
        transition: all 0.2s ease;
        border-radius: 0.25rem;

        &.rounded {
          border-radius: var(--font-size);
        }

        &.isOpen {
          border-bottom-left-radius: 0;
          border-bottom-right-radius: 0;
        }

        .decorator {
          @include decorator-style;
        }

        .icon-wrapper {
          border-left-color: transparent !important;
          order: 1;

          &.iconRight {
            border-left-color: var(--primary-border) !important;
            border-right-color: transparent !important;
            order: 97;
          }
        }

        .secret-wrapper {
          border-right-color: transparent !important;
          order: 98;
        }

        .input-field {
          width: 100%;
          border: 1px solid transparent;
          background-color: var(--primary-bg);
          color: var(--primary-text);
          outline: none;
          padding: 0 0.5rem;
          box-sizing: border-box;
          font-size: var(--font-size);
          flex-grow: 1;
          flex-shrink: 1;
          height: var(--height);
          order: 97;

          &.iconRight {
            order: 1;
          }
        }

        .secret {
          -webkit-text-security: disc;
          -moz-text-security: disc;
          text-security: disc;
        }
      }

      .disabled, .readonly {
        .decorator {
          cursor: not-allowed;
        }
        .input-field {
          cursor: not-allowed;
        }
      }

      .error {
        border: 1px solid var(--danger);

        .decorator {
          border-color: var(--danger);
        }

        .secret-wrapper,
        .icon-wrapper,
        .input-field, .input-field::placeholder {
          color: var(--danger);
        }
      }
    }
  }

  @keyframes rotate {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
    }
  }
</style>