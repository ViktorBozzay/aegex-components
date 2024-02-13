<script lang="ts">
  import { createEventDispatcher } from "svelte";
  import { v4 as uuid } from "uuid";

  import DatePicker from "./DatePicker.svelte";
  import InputLabel from "./InputLabel.svelte";
	import InputError from "./InputError.svelte";

  import type { DateRange } from "./types/DateRange.js";

  export let id: string = uuid();
  export let value: DateRange | null = null;
  export let name: string;
  export let label: string = "";
  export let size: string = "1rem";
  export let labelPos: "left" | "right" | "top" | "bottom" = "top";
  export let info: string = "";
  export let infoPos: 'top' | 'bottom' | 'left' | 'right' = 'top';
  export let error: string = "";
  export let errorTimeOut: number = 5000;
  export let showWeekNr: boolean = false;
  export let locale: string = "en";
  export let required: boolean = false;
  export let disabled: boolean = false;
  export let readonly: boolean = false;

  const dispatch = createEventDispatcher();

  const handleChange = (e: CustomEvent) => {
    dispatch('change', {name, value});
  }
</script>

<div class="date-range-picker-container">
  <InputLabel {label} {required} {info} {id} {size} {infoPos} {error} {disabled}/>
    <DatePicker
      on:change={handleChange}
      {...$$restProps}
      {name}
      {locale}
      {showWeekNr}
      range={true}
      bind:value
    />
  <InputError bind:error {size} timeOut={errorTimeOut}/>
</div>

<style lang="scss">
  .date-range-picker-container {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
  }
</style>