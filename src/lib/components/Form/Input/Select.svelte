<script lang="ts">
	import { onMount, createEventDispatcher } from "svelte";
	import { slide } from "svelte/transition";

  import TextInput from "./TextInput.svelte";
	import Icon from "../../Icon/Icon.svelte";
  import ScrollableContainer from "../../ScrollableContainer/ScrollableContainer.svelte";

  import type { SelectOption } from "./types/SelectOption.js";

  import { clickOutside } from "../../../actions/clickOutside.js";

  import { deepEqual } from "../../../utils/deepEqual.js";
  import { validateDimensionStyle } from "../../../utils/validateDimensionStyle.js";
	import { getSizeUnit } from "../../../utils/getSizeUnit.js";

	import type { Colors } from "../../../types/Colors.js";

  export let name: string;
  export let text: string = "";
  export let label: string = "";
  export let labelPos: "left" | "right" | "top" | "bottom" = "top";
  export let size: string = "1rem";
  export let width: string = "100%";
  export let maxSelectHeight: string = "20rem";
  export let selected: string | undefined = undefined;
  export let placeholder: string ="Choose an option..."
  export let options: SelectOption[];
  export let color: Colors = "primary";
  export let error: string = "";
  export let errorTimeOut: number = 5000;
  export let icon: string = "";
  export let iconRight: boolean = false;
  export let info: string = "";
  export let disabled: boolean = false;
  export let rounded: boolean = false;
  export let required: boolean = false;
  export let readonly: boolean = false;
  export let loading: boolean = false;

  const dispatch = createEventDispatcher();

  if (!validateDimensionStyle(width))
    throw new Error("Invalid width dimension style for <Select />");
  if (!validateDimensionStyle(maxSelectHeight))
  throw new Error("Invalid maxSelectHeight dimension style for <Select />");

  let inputRef: HTMLDivElement;
  let inputWidth: number = getSizeUnit(width).size;
  let isOpen = false;
  let toRender: SelectOption[] = [...options];
  const minMatchLength = 3;

  $: {
    if (isOpen && error !== "")
      isOpen = false;
  }

  if (!options || options?.length === 0)
    throw new Error("Options is required for <Select />");

  let resizeObserver: ResizeObserver;

  onMount(() => {
    if (inputRef) {
      resizeObserver = new ResizeObserver(() =>
        inputWidth = inputRef.getBoundingClientRect().width);
      resizeObserver.observe(inputRef);
    }
    if (selected) text = selected;
    return ()=>resizeObserver.disconnect();
  })

  const handleOpen = () => {
    if (disabled) return;
    if (readonly) return;

    if (inputRef )
      inputWidth = inputRef.getBoundingClientRect().width;

    error = "";
    isOpen = !isOpen;
    if (!isOpen) {
      text = "";
      toRender = [...options];
    }
  }

  const handleClose = () => {
    isOpen = false;
    toRender = [...options];
  };

  const handleSelect = ({value, label}: SelectOption) => {
    text = label;
    selected = value;
    isOpen = false;
    error = "";
    dispatch("change", { name, value: label, selected });
  }

  const handleInput = () => {
    isOpen = true;
    error = "";

    if (text.length >= minMatchLength)
    toRender = options.filter(opt =>  opt.label.toLowerCase().includes(text.toLowerCase()));
    else toRender = [...options];
  }

  const handleChange = () => {
    isOpen = false
    const validSelect = options.find(opt => deepEqual(opt.label, text))
    if (!validSelect) {
      error = "Please select a valid option";
      selected = "";
      text = "";
    } else {
      error = "";
      selected = validSelect.value;
      text = validSelect.label;
    }
    dispatch("change", { name, value: text, selected });
  }
</script>

<div
  bind:this={inputRef}
  class="select-container"
  style={`
    --select-container-width: ${width};
    --select-container-max-width: ${width.includes("%")
      ? "unset"
      : "min-content"};
    --max-select-height: ${maxSelectHeight};
    --options-width: ${inputWidth}px;
    --font-size: ${ typeof size === "string" ? size : `${size}px`};
  `}
  use:clickOutside
  on:outsideClick={handleClose}
>
  <TextInput
    {...$$restProps}
    bind:value={text}
    bind:error
    on:input={handleInput}
    on:change={handleChange}
    inputType="select"
    width="100%"
    {name}
    {placeholder}
    {size}
    {label}
    {isOpen}
    {required}
    {disabled}
    {readonly}
    {color}
    {labelPos}
    {rounded}
    {icon}
    {iconRight}
    {info}
    {loading}
    {errorTimeOut}
  >
    <button
      class="open decorator"
      class:error
      class:iconRight
      on:click|preventDefault={handleOpen}
    >
      <span
        class="icon-wrapper"
        class:isOpen
      >
        <Icon icon="SelectArrow" {size} />
      </span>
    </button>
  </TextInput>

  <!-- in:fade={{ delay: 210 }}
  out:fade={{ duration: 190 }} -->
  {#if isOpen}
    <div
      class="select-options-container"
      transition:slide
      class:isOpen
      class:rounded
      class:error
    >
      {#if toRender.length > 0}
        <ScrollableContainer>
          {#each toRender as option (option.value)}
            <!-- svelte-ignore a11y-click-events-have-key-events -->
            <!-- svelte-ignore a11y-no-static-element-interactions -->
            <div
              class="select-option"
              class:matching={text.length > 0  && option.label.toLowerCase().includes(text.toLowerCase())}
              on:click|preventDefault={()=>handleSelect(option)}
            >
              {option.label}
            </div>
          {/each}
        </ScrollableContainer>
      {:else}
        <div class="no-results">
          No results found
        </div>
      {/if}
    </div>
  {/if}
</div>

<style lang="scss">
  @import './styles/decorator.scss';

  .select-container {
    //  max-width: var(--select-container-max-width);
    width: var(--select-container-width);

    .no-results {
      padding: 0.25rem 0.5rem;
    }

    .select-options-container {
      position: absolute;
      display: flex;
      flex-direction: column;
      gap: 0.25rem;
      background-color: var(--primary-bg);
      border-radius: 0.25rem;
      z-index: 12;
      box-shadow: 1px 2px 5px var(--primary-shadow);
      max-height: var(--max-select-height);
      height: min(100%, fit-content);
      min-width: var(--options-width);
      box-sizing: border-box;
      border: 1px solid var(--primary-shadow);
      border-top-width: 0px;

      &.rounded {
        border-radius: var(--font-size);
      }

      &.isOpen {
        border-top-left-radius: 0;
        border-top-right-radius: 0;
      }

      &.error {
        border: 1px solid var(--danger);
        border-radius: var(--font-size);
      }

      .select-option {
        padding: 0.25rem 0.5rem;
        border-radius: 0.25rem;
        cursor: pointer;
        transition: all 0.2s ease;
        font-size: var(--font-size);

        &:hover {
          background-color: var(--primary-bg-800);
        }

        &.matching {
          font-weight: 600;
        }
      }
    }

    //TODO use mixin here
    .decorator {
      @include decorator-style;
      border-right-color: transparent !important;
      order: 100;

      .icon-wrapper {
        transition: rotate 0.3s ease;

        &.isOpen {
          rotate: 180deg;
        }
      }
    }
  }
</style>