<script lang="ts">
  import { fly } from "svelte/transition";
  import { createEventDispatcher } from "svelte";

	import InputError from "./InputError.svelte";
	import InputLabel from "./InputLabel.svelte";
	import Icon from "../../Icon/Icon.svelte";
	import Tooltip from "../../Tooltip/Tooltip.svelte";

	import type { RadioOption } from "./types/RadioOptions.js";

  export let value: any = undefined;
  export let label: string = "";
  export let name: string;
  export let options: RadioOption[] = [];
  export let row = false;
  export let size: string = "1rem";
  export let info: string = "";
  export let infoPos: 'top' | 'bottom' | 'left' | 'right' = 'top';
  export let selected: string | undefined = undefined;
  export let error: string = "";
  export let errorTimeOut = 5000;
  export let required: boolean = false;
  export let disabled: boolean = false;

  const _name = name; // QUESTION: why do we need this?

  const dispatch = createEventDispatcher();

  const checkLabels = new Set(options.map(option => option.label));
  if (checkLabels.size !== options.length)
    throw new Error("Radio options must have unique labels");

  let labelRef: HTMLParagraphElement;
  let radioContRef: HTMLDivElement;
  let checkMarkRef: HTMLDivElement;
  let radioInputRefs: Record<string, {top: number, left: number}> = {};
  let checkMarkPos: {top: number, left: number} = {top: 0, left: 0};
  let labelHeight: number;

  $: {
    if (labelRef) {
      labelHeight = labelRef.getBoundingClientRect().height;
    }
  }
  $: {
    if (radioContRef) {
      const radioInputsPos = radioContRef.getBoundingClientRect();
      radioInputRefs = Array.from(radioContRef.getElementsByTagName("input")).reduce((acc, radio)=>({
        ...acc,
        [radio.id]: {
          top: radio.getBoundingClientRect().top - radioInputsPos.top + labelHeight,
          left: radio.getBoundingClientRect().left - radioInputsPos.left
        }
      }), {});
    }
  }
  $: {
    if (checkMarkRef) {
      checkMarkRef.style.top = `${checkMarkPos.top}px`;
      checkMarkRef.style.left = `${checkMarkPos.left}px`;
    }
  }

  const handleChange = (option: RadioOption) => {
    selected = option.label;
    value = option.value;
    checkMarkPos = radioInputRefs[selected];
    dispatch("change", { name: _name, value: option });
  }
</script>

<div
  class="radio-input-container"
  style={`
    --size: ${size};
    --horizontal: ${row ? "row" : "column"};
    --margin: ${label ? `${labelHeight}px` : "0"};
  `}
>
  {#if label}
    <p
      class="radio-label"
      bind:this={labelRef}
    >
      {label}
      {#if required}
        <span class="required">*</span>
      {/if}
      {#if info}
        <Tooltip text={info} position={infoPos} size={size}>
          <span class="info">
            <Icon icon="Info" {size} />
          </span>
        </Tooltip>
      {/if}
    </p>
  {/if}
  <div
    class="radio-wrapper"
    bind:this={radioContRef}
  >
    {#each options as option (option.label)}
      <div
        class="radio-container"
      >
        <input
          type="radio"
          id={option.label}
          value={option.label}
          {disabled}
          bind:group={name}
          on:change={()=>handleChange(option)}
        />
        <InputLabel
          id={option.label}
          label={option.label}
          info={option.info}
          {size}
        />
      </div>
    {/each}
    {#if selected}
      <div
        in:fly={{duration: 200, x: -20}}
        class="check-mark"
        bind:this={checkMarkRef}
      >
        <Icon icon="X" {size} />
      </div>
    {/if}
  </div>
  <InputError bind:error {size} timeOut={errorTimeOut}/>
</div>

<style lang="scss">
  .radio-input-container {
    position: relative;
    max-width: fit-content;
    background-color: var(--primary-bg);
    margin-top: 0.75rem;

    .radio-label {
      display: block;
      position: absolute;
      top: calc(calc(var(--size) / -2) - var(--size) / 4);
      left: 0.5rem;
      padding: 0.25rem 1rem;
      border-radius: 0.25rem;
      z-index: 1;
      font-size: var(--size);
      max-width: calc(100% - 1rem);
      font-weight: 600;
      background-color: var(--primary-bg);
      box-shadow: 1px 2px 5px var(--primary-shadow);

      .required {
        color: var(--danger);
      }
      .info {
        position: absolute;
        top: calc(var(--size) / 4);
        right: calc(var(--size) / 4);
      }
    }

    .radio-wrapper {
      position: relative;
      display: flex;
      flex-direction: var(--horizontal);
      align-items: center;
      justify-content: center;
      border-radius: 0.25rem;
      box-shadow: 1px 2px 5px var(--primary-shadow);
      padding: 0.5rem 1rem;
      padding-top: var(--margin);
      gap: 0.5rem;

      .radio-container {
        display: flex;
        align-items: center;
        gap: 0.25rem;
        flex-wrap: nowrap;

        input:checked > label {
          cursor: default;
        }

        input {
          position: relative;
          width: var(--size);
          height: var(--size);
          margin: 0;
          padding: 0;
          outline: 0;
          background-color: transparent;
          border-radius: 0.2rem;
          appearance: none;
          -webkit-appearance: none;
          -moz-appearance: none;
          cursor: pointer;

          &:after {
            content: "";
            box-sizing: border-box;
            display: block;
            border: 2px solid var(--primary-bg-500);
            width: var(--size);
            height: var(--size);
            border-radius: 50%;
          }
        }
      }

      .check-mark {
        display: flex;
        align-items: center;
        justify-content: center;
        width: var(--size);
        height: var(--size);
        position: absolute;
        transition: all 0.2s ease;
      }
    }
  }
</style>