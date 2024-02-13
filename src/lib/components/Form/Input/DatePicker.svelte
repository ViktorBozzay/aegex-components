<script lang="ts">
  import { createEventDispatcher, onMount } from "svelte";
  import { v4 as uuid } from "uuid";

  import Icon from "../../Icon/Icon.svelte";
  import InputLabel from "./InputLabel.svelte";
	import InputError from "./InputError.svelte";
	import Tooltip from "../../Tooltip/Tooltip.svelte";

  import {lang} from "../../../constants/languages.js";

  import { isValidDate } from "../../../utils/isValidDate.js";
  import { daysBetweenDates } from "../../../utils/daysBetweenDates.js";
  import { getISOWeekNumber } from "../../../utils/getISOWeekNumber.js";
  import { formatMonthYear } from "../../../utils/formatMonthYear.js";
  import { getDayName } from "../../../utils/getDayName.js";

  import { dateTypeBarrier } from "./utils/dateTypeBarrier.js";

  import type { DateRange } from "./types/DateRange.js";
	import type { WeekDay } from "./types/Weekday.js";

  export let id: string = uuid();
  export let name: string;
  export let value: Date | DateRange | null = null;
  export let view: Date = new Date();
  export let label: string = "";
  export let size: string = "1rem";
  export let locale: string = "en";
  export let labelPos: "left" | "right" | "top" | "bottom" = "top";
  export let info: string = "";
  export let infoPos: 'top' | 'bottom' | 'left' | 'right' = 'top';
  export let error: string = "";
  export let errorTimeOut: number = 5000;
  export let showWeekNr: boolean = false;
  export let range: boolean = false;
  export let onlyFrom: boolean = false;
  export let onlyTo: boolean = false;
  export let required: boolean = false;
  export let disabled: boolean = false;
  export let readonly: boolean = false;

  /* TODO: these have to be protected form the outside? */
  export let rangeSetStart = false;
  export let hovered: WeekDay | null = null;

  let dispatch = createEventDispatcher();

  onMount(() => {
    view = dateTypeBarrier(value, {
      isNull: () => new Date(),
      isDate: (value) => new Date(value),
      isDateRange: (value) => {
        if (onlyFrom)
          return new Date(value.from ?? value.to ?? new Date());
        else if (onlyTo)
          return new Date(value.to ?? value.from ?? new Date());
        else
          return new Date(value.from ?? value.to ?? new Date());
      }
    });
  })

  const getViewedMonthLayout = (date: Date): { weekDays: WeekDay[], weekNumber: number }[] => {
    const firstDayOfMonth = new Date(date.getFullYear(), date.getMonth(), 1);
    const lastDayOfMonth = new Date(date.getFullYear(), date.getMonth() + 1, 0);

    const firstDay = firstDayOfMonth.getDay();
    const lastDay = lastDayOfMonth.getDay();
    const prevSunday = new Date(firstDayOfMonth);
    prevSunday.setDate(firstDayOfMonth.getDate() - firstDay);

    const nextSaturday = new Date(lastDayOfMonth);
    nextSaturday.setDate(lastDayOfMonth.getDate() + (7 - lastDay));
    const days = daysBetweenDates(prevSunday, nextSaturday);
    return new Array(days / 7).fill([]).map((_arr, wNr) => {
      const weekDays = new Array(7)
        .fill(new Date(prevSunday))
        .map((sDay, dNr) => {
          const currentDate = new Date(sDay);
          currentDate.setDate(sDay.getDate() + dNr + (wNr * 7));
          const date = new Date(currentDate);

          const day = date.getDate();
          const month = date.getMonth();
          const year = date.getFullYear();
          return { year, month,  day, dayName: getDayName(currentDate, lang[locale]) };
        })
      const weekNumber = getISOWeekNumber(new Date(weekDays[0].year, weekDays[0].month, weekDays[0].day));

      return { weekDays, weekNumber};
    })
  }

  let monthArr = getViewedMonthLayout(view);
  const getDayNames = () => monthArr[0].weekDays.map(m => m.dayName);
  const dayNames = getDayNames();

  const checkSelected = (weekDay: { year: number , month: number, day: number}) => {

    return dateTypeBarrier(value, {
      isNull: () => false,
      isDate: (value) => weekDay.year === value.getFullYear() && weekDay.month === value.getMonth() && weekDay.day === value.getDate(),
      isDateRange: (value) => {
        if (value.from && value.to) {
          const start = value.from.getTime();
          const end = value.to.getTime();
          const date = new Date(weekDay.year, weekDay.month, weekDay.day).getTime();
          return date >= start && date <= end;
        } else if (value.from) {
          return weekDay.year === value.from.getFullYear() && weekDay.month === value.from.getMonth() && weekDay.day === value.from.getDate();
        }
      }
    });
  }

  const organizeRange = ({from, to}: {from: Date | null, to: Date | null}): { from: Date | null, to: Date | null } => {
    if (from && to)
      if (from.getTime() > to.getTime())
        return { from: to, to: from };
    return { from, to };
  };

  const selectRange = (weekDay: WeekDay) => {
    let newValue: DateRange | null = null;
    if (rangeSetStart) {
      const { from } = value ?? { from: null, to: null };
      const to = new Date(weekDay.year, weekDay.month, weekDay.day);
      newValue = organizeRange({from, to});
    } else {
      newValue = {
        from: new Date(weekDay.year, weekDay.month, weekDay.day),
        to: null,
      }
    }
    rangeSetStart = !rangeSetStart;
    dispatch("change", { name, newValue, [name]: newValue });
    return newValue;
  }

  const selectDate = (weekDay: WeekDay) => {
    if (checkSelected(weekDay)) {
      value = null;
      dispatch("cancel", { name, value, [name]: value });
    }
    else {
      value = new Date(weekDay.year, weekDay.month, weekDay.day);
      const viewedMonth = view.getMonth();
      if (viewedMonth !== weekDay.month) view = new Date(value);
      dispatch("change", { name, value, [name]: value });
    }
  }

  const changeFromOrTo = (weekDay: WeekDay): DateRange => {
    let newValue: DateRange = {from: null, to: null};
    if (value === null) return newValue;
    else if (value instanceof Date) return newValue;
    else {
      if (range  && (value.from === null || value.to === null)) {
        newValue = selectRange(weekDay);
      } else {
        if (onlyTo) {
          newValue = organizeRange({
            ...value,
            to: new Date(weekDay.year, weekDay.month, weekDay.day),
          })
        } else if (onlyFrom) {
          newValue = organizeRange({
            ...value,
            from: new Date(weekDay.year, weekDay.month, weekDay.day),
          })
        }
        dispatch("change", { name, newValue, [name]: newValue });
      }
    }
    return newValue;
  }

  const handleSelect = (weekDay: WeekDay) => {
    if (!range) selectDate(weekDay); //TODO: set the value here not in the selectDate function!
    else {
      if (onlyFrom || onlyTo) value = changeFromOrTo(weekDay);
      else value = selectRange(weekDay);
    }
  }

  const handleChangeMonth = (amount: number) => {
    view = new Date(view.setMonth(view.getMonth() + amount));
  }

  const handleHovered = (weekDay: WeekDay): void => {
    if (!range) return; else
    if (!rangeSetStart) return; else

    dateTypeBarrier(value, {
      isNull: () => undefined,
      isDate: () => undefined,
      isDateRange: (value) => {
        if (value.from !== null) {
          const hoveredDate = new Date(weekDay.year, weekDay.month, weekDay.day).getTime();
          hovered = weekDay;
          const fromDate = new Date(value.from).getTime();

          monthArr = monthArr.map((week) => {
            return { ...week, weekDays: week.weekDays.map((day) => {
              const currentDate = new Date(day.year, day.month, day.day).getTime();

              const [minDate, maxDate] = [hoveredDate, fromDate]
                .sort((a, b) => a - b);

              const inRange = minDate <= currentDate && currentDate <= maxDate;
              return inRange
                ? {...day, hovered: true}
                : {...day, hovered: false};
            })}
          })
        }
      }
    })
  };

  const isFromOrToDate = (weekDay: WeekDay, dir: "from" | "to") => {
    return dateTypeBarrier(value, {
      isNull: () => false,
      isDate: () => false,
      isDateRange: (value) => weekDay.year === value[dir]?.getFullYear() && weekDay.month === value?.[dir]?.getMonth() && weekDay.day === value?.[dir]?.getDate()
    })
  }

  const handleJumpToToday = () => {
    view = new Date();
  }

  $: {
    if (range)
      value = dateTypeBarrier(value, {
        isDateRange: (value) => {
          return { from: value?.from ?? null, to: value?.to ?? null };
        }
      })
    else
      if (value !== null && !isValidDate(value))
        value = new Date();

    monthArr = getViewedMonthLayout(view);
  }
</script>

<div class="datepicker">
  <InputLabel {label} {required} {info} {id} {size} {infoPos} {error} {disabled}/>
  <div class="datepicker-header">
    <button
      class="month-change"
      on:click={()=>handleChangeMonth(-1)}
    >
      <Icon icon="ArrowLeft" />
    </button>
    <Tooltip text="Jump to today">
      <button
        class="jump-to-today"
        on:click={handleJumpToToday}
      >
        {formatMonthYear(view, lang[locale])}
      </button>
    </Tooltip>
    <button
      class="month-change"
      on:click={()=>handleChangeMonth(1)}
    >
      <Icon icon="ArrowRight" />
    </button>
  </div>
  <div
    class="datepicker-container"
    class:showWeekNr
  >
    {#each showWeekNr ? ["#w", ...dayNames] : dayNames as dayName (dayName)}
      <div class="day-name">
        {dayName}
      </div>
    {/each}
    {#each monthArr as week (week.weekNumber)}
      {#if showWeekNr}
        <div class="week-number">
          {week.weekNumber}
        </div>
      {/if}
      {#each week.weekDays as weekDay (weekDay.day)}
        <button
          on:mouseenter={()=>handleHovered(weekDay)}
          on:click={()=>handleSelect(weekDay)}
          class:range
          class:selected={checkSelected(weekDay) || weekDay?.hovered}
          class:from={isFromOrToDate(weekDay, "from")}
          class:to={isFromOrToDate(weekDay, "to")}
          class:rangeSetStart
          class:notThisMonth={weekDay.month !== view.getMonth()}
          class="day-number"
          {disabled}
        >
          {weekDay.day}
        </button>
      {/each}
    {/each}
  </div>
  <InputError bind:error {size} timeOut={errorTimeOut}/>
</div>


<style lang="scss">
  @mixin pseudo-element-arrow($color, $left) {
    position: absolute;
    display: block;
    top: 50%;
    transform: translate(0%, -50%);
    width: 0;
    height: 0;
    border: 5px solid transparent;
    border-left-color: $color;
    content: "";
    left: $left;
    @if ($left == 0%) {
      z-index: 1;
    }
    @if ($left == 100%) {
      z-index: 2;
    }
  }

  @mixin pseudo-element-arrow-left($color) {
    @include pseudo-element-arrow($color, 100%);
  }

  @mixin pseudo-element-arrow-right($color) {
    @include pseudo-element-arrow($color, 0%);
  }

  .datepicker {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    width: fit-content;

    .datepicker-header {
      display: flex;
      justify-content: space-between;


      button {
        background-color: transparent;
        color: var(--primary-text);
        outline: 0;
        border: 0;
        transition: all 0.2s ease-in-out;
        cursor: pointer;

        &:hover {
          cursor: pointer;
          color: var(--primary-bg-700);
        }
      }

      button.jump-to-today {
        font-weight: 600;
        font-size: 1rem;
      }
    }

    .datepicker-container {
      display: grid;
      grid-template-columns: repeat(7, minmax(0, 2rem));
      box-shadow: 1px 2px 5px var(--primary-shadow);
      border-radius: 0.25rem;
      overflow: hidden;

      &.showWeekNr {
        grid-template-columns: repeat(8, minmax(0, 2rem)) !important;
      }

      .day-name, .week-number {
        padding: 0.25rem;
        font-size: 0.75rem;
        font-weight: 600;
        color: var(--primary-text-200);
        background-color: var(--primary-bg-900);
        overflow: visible;
        text-align: center;
        cursor: default;
        user-select: none;
        overflow: visible;
      }

      .day-name {
        border-bottom: 1px solid var(--primary-bg-700);
      }

      .week-number {
        border-right: 1px solid var(--primary-text-800);
      }

      button {
        padding: 0.25rem;
        border-radius: 0.25rem;
        text-align: center;
        color: var(--primary-text);
        border: 0;
        outline: 0;
        background-color: transparent;

        &.selected {
          background-color: var(--primary-bg-400);
          color: var(--primary-text-900);
          border: 0.25rem;

          // &:nth-child(2n) {
          //   background-color: var(--primary-bg-500);

          //   &::after {
          //     @include pseudo-element-arrow-left(var(--primary-bg-500));
          //   }
          //   &::before {
          //     @include pseudo-element-arrow-right(var(--primary-bg-400));
          //   }
          // }

          &.range {
            position: relative;
            border-radius: 0;

            &:hover::after {
              @include pseudo-element-arrow-left(var(--primary-bg-200));
            }

            &:not(.to):hover::before {
              @include pseudo-element-arrow-right(var(--primary-bg-400));
            }

            &.from {
              background-color: var(--primary-bg-300);
              border-top-left-radius: 0.25rem;
              border-bottom-left-radius: 0.25rem;
              transition: border-radius 0.2s ease-in-out;

              &:not(.rangeSetStart)::after {
                @include pseudo-element-arrow-left(var(--primary-bg-300));
              }
              &:not(.rangeSetStart):hover::after {
                border-left-color: var(--primary-bg-200);
              }

              &::before {
                display: none !important;
              }
              &:hover::before {
                display: none;
              }
            }

            &.to {
              background-color: var(--primary-bg-300);
              border-top-right-radius: 0.25rem;
              border-bottom-right-radius: 0.25rem;
              transition: border-radius 0.2s ease-in-out;

              &:not(.rangeSetStart)::after {
                @include pseudo-element-arrow-right(var(--primary-bg-400));
              }
            }
          }

          &.rangeSetStart {
            border-radius: 0 !important;
          }

          &:hover {
            position: relative;
            background-color: var(--primary-bg-200) !important;

            &::before, &::after {
              display: none;
            }
          }
        }

        &.notThisMonth {
          color: var(--primary-text-600);
        }

        &.day-number {
          cursor: pointer;
          &:hover {
            background-color: var(--primary-bg-800);
          }
        }
      }
    }
  }

</style>