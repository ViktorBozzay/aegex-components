<script lang="ts">
  import { createEventDispatcher } from "svelte";
  import { v4 as uuid } from "uuid";

  import DateInput from "./DateInput.svelte";
	import Icon from "../../Icon/Icon.svelte";
	import InputLabel from "./InputLabel.svelte";
	import InputError from "./InputError.svelte";

	import type { DateRange } from "./types/DateRange.js";

  export let name: string;
  export let label: string = "";
  export let value: DateRange = { from: null, to: null };
  export let size: string = "1rem";
  export let info: string = "";
  export let infoPos: 'top' | 'bottom' | 'left' | 'right' = 'top';
  export let error: string = "";
  export let locale: string = "en";
  export let showWeekNr: boolean = false;
  export let errorTimeOut: number = 5000;
  export let required: boolean = false;
  export let disabled: boolean = false;

  const dispatch = createEventDispatcher();

  const handleChange = () => {
    dispatch("change", { name, value });
  }
</script>

<div class="date-range-input-container">
  <InputLabel {label} {required} {info} id={uuid()} {size} {infoPos} {error} {disabled}/>
  <div class="date-range-input-wrapper">
    <DateInput
      on:change={handleChange}
      bind:value
      name={name + "-from"}
      label={"from:"}
      {disabled}
      {showWeekNr}
      {locale}
      onlyFrom
      range
    />
    <div style="margin-bottom:0.33rem">
      <Icon icon="ArrowRight" />
    </div>
    <DateInput
      on:change={handleChange}
      bind:value
      name={name + "-to"}
      label={"to:"}
      {disabled}
      {showWeekNr}
      {locale}
      onlyTo
      range
    />
  </div>
  <InputError bind:error {size} timeOut={errorTimeOut}/>
</div>

<style lang="scss">
  .date-range-input-container {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;

    .date-range-input-wrapper {
      display: flex;
      align-items: flex-end;
      gap: 0.25rem;

    }
  }
</style>