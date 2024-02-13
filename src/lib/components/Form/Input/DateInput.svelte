<script lang="ts">
  import { createEventDispatcher } from "svelte";
	import { fade, slide } from "svelte/transition";
  import { v4 as uuid } from "uuid";

  import DatePicker from "./DatePicker.svelte";
	import TextInput from "./TextInput.svelte";

  import { lang } from "../../../constants/languages.js";
	import { isValidDate } from "../../../utils/isValidDate.js";
  import { clickOutside } from "../../../actions/clickOutside.js";

	import { dateTypeBarrier } from "./utils/dateTypeBarrier.js";

  import type { DateRange } from "./types/DateRange.js";

  export let id = uuid();
  export let name: string;
  export let label: string = "";
  export let value: Date | DateRange | null = new Date() ;
  export let size: string = "1rem";
  export let width: string = "100%";
  export let info: string = "";
  export let infoPos: 'top' | 'bottom' | 'left' | 'right' = 'top';
  export let error: string = "";
  export let locale: string = "en";
  export let required: boolean = false;
  export let disabled: boolean = false;
  export let showWeekNr: boolean = false;
  export let range: boolean = false;
  export let onlyFrom: boolean = false;
  export let onlyTo: boolean = false;

  const dispatch = createEventDispatcher();

  let view: Date = new Date();
  let text: string = "";

  let isOpen = false;

  const formatDate = (date: Date | DateRange | null, locale = "en-US"): string => {
    const options = { month: '2-digit', day: '2-digit', year: 'numeric' };
    const formatter = new Intl.DateTimeFormat(locale, options);

    return dateTypeBarrier(date, {
      isNull: (date) => '',
      isDate: (date) => formatter.format(date),
      isDateRange: (date) => {
        if (onlyFrom) return formatDate(date.from ?? null, locale);
        if (onlyTo) return formatDate(date.to ?? null, locale);
      },
    })
  }

  const setTextValue = (value: Date | DateRange | null): void => {
    dateTypeBarrier(value, {
      isNull: (text) => text = "",
      isDate: (value) => text = formatDate(value, lang[locale]),
      isDateRange: (value) => {
        if (onlyFrom)
          text = formatDate(value.from, lang[locale]);
        else if (onlyTo)
          text = formatDate(value.to, lang[locale]);
      }
    });
  }

  $: setTextValue(value);

  const handleOpen = () => isOpen = true;

  const handleSelect = () => {
    dispatch("change", {name, value});
    handleClose();
  };

  const handleCancel = () => {
    handleClose();
    text = "";
  }

  const handleClose = () => {
    if (!range) isOpen = false;
    else if (value !== null && !(value instanceof Date))
      if (value.from && value.to) isOpen = false;
  }

  const handleInputChange = () => {
    const inputValue = new Date(text);
    if (isValidDate(inputValue)) {
      value = dateTypeBarrier(value, {
        isNull: () => inputValue,
        isDate: () => inputValue,
        isDateRange: (value) => {
          if (onlyFrom)
            return {...value, from: inputValue }
          else if (onlyTo)
            return {...value, to: inputValue }
        }
      });
      view = new Date(inputValue);
      text = formatDate(value, lang[locale]);
      isOpen = false
      dispatch("change", {name, value});
    }
  }

</script>

<div
  use:clickOutside
  on:outsideClick={() => isOpen = false}
  class="date-input-container"
  style="width: {width}"
>
  <TextInput
    on:focus={handleOpen}
    on:change={handleInputChange}
    bind:value={text}
    icon="Calendar"
    width="100%"
    {id}
    {name}
    {label}
    {size}
    {info}
    {infoPos}
    {error}
    {required}
    {disabled}
  />
  {#if isOpen}
    <div
      class="popup"
      transition:slide
    >
      <DatePicker
        name={name + "-picker"}
        on:change={handleSelect}
        on:cancel={handleCancel}
        bind:value
        bind:view
        {showWeekNr}
        {locale}
        {onlyFrom}
        {onlyTo}
        {range}
      />
    </div>
  {/if}
</div>


<style lang="scss">
  .date-input-container{
    position: relative;
    width: fit-content;


    .popup {
      position: absolute;
      width: fit-content;
      top: 100%;
      left: 0;
      background-color: var(--primary-bg);
      padding: 1rem;
      border-radius: 0.25rem;
      box-shadow: 1px 2px 5px var(--primary-shadow);
      z-index: 100;
    }
  }
</style>