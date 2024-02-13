<script lang="ts">
  import { createEventDispatcher } from "svelte";
  import { v4 as uuid } from "uuid";

  import DatePicker from "./DatePicker.svelte";
	import InputLabel from "./InputLabel.svelte";
	import InputError from "./InputError.svelte";

	import type { DateRange } from "./types/DateRange.js";
	import type { WeekDay } from "./types/Weekday.js";

  export let id: string = uuid();
  export let name: string;
  export let label: string = "";
  export let size: string = "1rem";
  export let value: DateRange = { from: null, to: null };
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

  let rangeSetStart = false;
  let hovered: WeekDay | null = null;

  const handleChange = (e: CustomEvent) => {
    dispatch("change", {name, value})
  }

</script>

<div class="date-range-input-container">
  <InputLabel {label} {required} {info} {id} {size} {infoPos} {error} {disabled}/>
  <div class="date-range-input-wrapper">
    <div class="from-date-picker">
      <DatePicker
        on:change={handleChange}
        bind:value
        bind:hovered
        bind:rangeSetStart
        name="range"
        {locale}
        {showWeekNr}
        range
        onlyFrom
      />
    </div>
    <div class="to-date-picker">
      <DatePicker
        on:change={handleChange}
        bind:value
        bind:hovered
        bind:rangeSetStart
        name="range"
        {locale}
        {showWeekNr}
        range
        onlyTo
      />
    </div>
  </div>
  <InputError bind:error {size} timeOut={errorTimeOut}/>
</div>

<style lang="scss">
  .date-range-input-container {
    display: flex;
    flex-direction: column;
    gap: 0.25rem;

    .date-range-input-wrapper {
      display: flex;
      gap: 0.25rem;

    }
  }
</style>