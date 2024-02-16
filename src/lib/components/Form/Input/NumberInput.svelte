<script lang="ts">
  import TextInput from "./TextInput.svelte";
  import Icon from "$lib/components/Icon/Icon.svelte";
  import { SvelteComponent, createEventDispatcher } from "svelte";

  import { validateDimensionStyle } from "../../../utils/validateDimensionStyle.js";

  export let name: string;
  export let value: number | undefined;
  export let loading: boolean = false;
  export let size: string = "1rem";
  export let width: string = "100%";
  export let label: string = "";
  export let step: number = 1;
  export let min: number = -Infinity;
  export let max: number = Infinity;
  export let icon: string ="Number"
  export let iconRight: boolean = false;
  export let error: string = "";
  export let disabled: boolean = false;
  export let readonly: boolean = false;
  export let errorTimeOut: number = 5000;

  let inputRef: SvelteComponent;
  const regex = /[^0-9.]/g;
  let strValue: string = value?.toString() ?? "";

  const log = Math.log10(step);
  const n = (log < 0) ? Math.abs(log) : 0;

  const dispatch = createEventDispatcher();

  if (!validateDimensionStyle(width))
    throw new Error("Invalid width dimension style for <NumberInput/>");

  $: handleValue(strValue);

  // TODO: this is ugly but works... later I will fix it if i can
  const handleValue = (newValStr: string) => {
    if (newValStr) {
      let [first, second, ...rest] = newValStr.split("")
      const minus = first === "-" ? "-" : "";
      if (first === ".") first = "0."
      if (first + second === "-.") second = "0.";

      const filteredRest = [first, second, ...rest].join("").replace(regex, "")
      let [int, dec] = filteredRest.split(".")
      dec = dec ? "." + dec.slice(0, n) : newValStr.includes(".") ? "." : "";

      strValue = minus + int + dec;

      value = parseFloat(strValue);
      if (value < min) value = min;
      if (value > max) value = max;

    } else {
      value = undefined
    }
  }

  const handleOperation = (operation: "+" | "-") => {
    if (disabled || readonly || loading) return;
    handleValue(value !== undefined
      ? (operation === "+"
          ? value += step
          : value -= step).toFixed(n)
        : "0");

    dispatch("change", {value, name});
    dispatch("input", {value, name});
  }
</script>

<TextInput
  {...$$restProps}
  bind:value={strValue}
  bind:this={inputRef}
  bind:error
  on:input
  on:change
  {width}
  {icon}
  {name}
  {size}
  {label}
  {loading}
  {iconRight}
  {disabled}
  {readonly}
  {errorTimeOut}
  inputType="number"
>
  <button
    on:click|preventDefault={()=>handleOperation("-")}
    class="minus decorator"
    class:error
    class:iconRight
    class:disabled={loading || disabled || readonly}
    >
    <Icon icon="Minus" {size}  />
  </button>
  <button
    on:click|preventDefault={()=>handleOperation("+")}
    class="plus decorator"
    class:error
    class:iconRight
    class:disabled={loading || disabled || readonly}
  >
    <Icon icon="Plus" {size} />
  </button>
</TextInput>

<style lang="scss">
  @import './styles/decorator.scss';

  //TODO use mixin here
  .decorator {
    @include decorator-style;

    &.error {
      color: var(--danger);
      border-color: var(--danger);
    }

    &.disabled {
      cursor: not-allowed;
    }

    &:hover {
      opacity: 1;
    }

    &.minus {
      order: 2;
      border-left: 1px solid transparent !important;

      &.iconRight {
        order: -1;
      }
    }

    &.plus {
      order: 97;
      border-right: 1px solid transparent !important;
    }
  }
</style>