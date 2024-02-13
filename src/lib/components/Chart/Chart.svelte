<script lang="ts">
	import { onMount } from 'svelte';
	import Chart, { type ChartType } from 'chart.js/auto';

  import Select from '../Form/Input/Select.svelte';
	import Multicheckbox from '../Form/Input/Multicheckbox.svelte';
  import Popupmenu from '../Popupmenu/Popupmenu.svelte';
  import IconButton from '../Buttons/IconButton/IconButton.svelte';
	import Fullscreen from '../Fullscreen/Fullscreen.svelte';

  import { chartOptions } from './constants/chartOptions.js';

  import type { SelectOption } from '../Form/Input/types/SelectOption.js';
	import type { CheckboxOption } from '../Form/Input/types/CheckboxOption.js';

  import { isDateStr } from '../../utils/isDateStr.js';
  import { createTimeRange } from '../../utils/createTimeRange.js';
	import { setTimeRange } from '../../utils/setTimeRange.js';

  import { TimeRange } from '../../constants/timeRange.js';


export let type: ChartType = "line";
  export let label = '';
  export let data: Record<string | number, number | string>[] = [
    {timestamp: 'Jan', net: 100, cogs: 50, gm: 50},
    {timestamp: 'Feb', net: 50, cogs: 100, gm: 75},
    {timestamp: 'Mar', net: 55, cogs: 65, gm: 100},
    {timestamp: 'Apr', net: 120, cogs: 55, gm: 42},
    {timestamp: 'May', net: 125, cogs: 57, gm: 42},
    {timestamp: 'Jun', net: 123, cogs: 59, gm: 40},
    {timestamp: 'Jul', net: 132, cogs: 55, gm: 32},
  ];
  export let transpose = false;
  export let labelKey = "timestamp";
  export let valueKeys: string[] | string = ["net", "cogs", "gm"];
  export let labelKeyText = {
    net: "Net sales",
    cogs: "Cost of goods sold",
    gm: "Gross margin"
  };
  export let width: string = "100%";
  export let height: string = "100%";

  let chart: Chart;
	let chartCanvas: HTMLCanvasElement;
	let ctx: CanvasRenderingContext2D;
  let _data: any;

  let options: CheckboxOption[];
  let showTimeRange: boolean = false;
  let timeRange: TimeRange = TimeRange.ALL;

  let isSettingsOpen: boolean = false;
  let isFullscreen: boolean = false;

  const timeChart = (data: Record<string | number, number | string>[]) => {
    const labels = data.map((d)=>d[labelKey]);
    const datasets =(Array.isArray(valueKeys)
      ? valueKeys
      : [valueKeys])
      .map((valueKey)=>{
        return {
          label: (labelKeyText?.[valueKey] ?? valueKey ?? "") as string,
          data,
          parsing: {
            yAxisKey: valueKey,
            xAxisKey: labelKey
          }
        }
      });
    return {labels, datasets};
  }

  const ratioChart = (data: Record<string | number, number | string>[]) => {
    const labels = valueKeys;
    const datasets = data.map((d)=>({
      label: d[labelKey],
      data: valueKeys.map((key) => d?.[key]),
    }))
    return {labels, datasets};
  }

	onMount(() => {
    if (!chartCanvas) return;
    ctx = chartCanvas?.getContext('2d') as CanvasRenderingContext2D;
    if (!ctx) return;

    showTimeRange = data.every((d)=>isDateStr(d[labelKey]));

    _data = transpose ? ratioChart(data) : timeChart(data);
    options = _data.datasets.map((d)=>{
      return {label: d.label, value: d.label, selected: true}
    })

    chart = new Chart(ctx, {
      type,
      options: chartOptions,
      data: {..._data},
    });
	});


  const handleMultiselect = (e: CustomEvent) => {
    if (!chart) return;
      chart.data.datasets = _data.datasets.filter((d) => e.detail.selected.includes(d.label)
      )
      chart.update();
    }

  const handleRangeChange = (e: CustomEvent) => {
    const dataChanged = setTimeRange(data, e.detail.selected, labelKey);

    _data = transpose ? ratioChart(dataChanged) : timeChart(dataChanged);
    chart.data = {..._data};
    chart.update();
  }
</script>

<Fullscreen bind:isFullscreen>
  <div class="chart-wrapper">
    <div class="controller">
      <Popupmenu
        bind:isOpen={isSettingsOpen}
        zIndex={15}
        position="bottom-right"
      >
        <IconButton
          slot="activator"
          icon="Settings"
          size="1.5rem"
          on:click={() => (isSettingsOpen = !isSettingsOpen)}
        />
        <div slot="menu" class="settings-menu">
          {#if showTimeRange}
            <Select
              label="Time range"
              width="15rem"
              name="timeRange"
              options={Object.entries(TimeRange).map(([value, label])=>({ label, value }))}
              bind:selected={timeRange}
              on:change={handleRangeChange}
            />
          {/if}
          {#if options}
            <Multicheckbox
              on:change={handleMultiselect}
              {options}
              name="datasetFilter"
              label="Datasets"
            />
          {/if}
        </div>
      </Popupmenu>
      <IconButton
        icon={ isFullscreen ? "ExitFullscreen" : "Fullscreen" }
        size="1.5rem"
        on:click={() => (isFullscreen = !isFullscreen)}
      />
    </div>
    <div class="chart">
      {#if label}
        <div>{label}</div>
      {/if}
      <canvas bind:this={chartCanvas} id="myChart"></canvas>
    </div>
  </div>
</Fullscreen>


<style lang="scss">
  .chart-wrapper{
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: var(--primary-bg);
    width: 100%;
    height: 100%;
    padding: 1rem;
    box-shadow: 1px 2px 5px var(--primary-shadow);
    border-radius: 0.5rem;
    transition: all 0.3s ease;
    overflow: auto;

    .controller {
      position: absolute;
      right: 0.5rem;
      top: 0.5rem;
      display: flex;
      gap: 0.5rem;
      align-items: center;
      opacity: 0.2;
      transition: all 0.3s ease;

      &:hover {
        opacity: 0.8;
      }

      .settings-menu {
        display: flex;
        flex-direction: column;
        gap: 0.5rem;
      }
    }

    .chart {
        canvas {
        width: 100% !important;
        max-width: 100vw !important;
        height: 100% !important;
        max-height: 100vh !important;
      }
    }
  }
</style>