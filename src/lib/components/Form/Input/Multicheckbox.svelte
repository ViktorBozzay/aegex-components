<script lang="ts">
	import { flip } from 'svelte/animate';
	import { createEventDispatcher, onMount } from 'svelte';
  import { v4 as uuid } from 'uuid';

  import Checkbox from './Checkbox.svelte';
	import TextInput from './TextInput.svelte';
	import ScrollableContainer from '../../ScrollableContainer/ScrollableContainer.svelte';
	import Icon from '../../Icon/Icon.svelte';
	import InputError from './InputError.svelte';
	import InputLabel from './InputLabel.svelte';

	import type { CheckboxOption } from './types/CheckboxOption.js';

	import { deepEqual } from '../../../utils/deepEqual.js';
	import { multiplySize } from '../../../utils/multiplySize.js';
	// import type { CheckboxState } from './types/CheckboxState';

  export let id: string = uuid();
  export let name: string;
  export let label: string = '';
	export let options: CheckboxOption[];
	export let selected: any[] = [];
	export let maxHeight: string = 'unset';
  export let hasFilter: boolean = false;
  export let hasControls: boolean = false;
  export let size: string = "1rem";
  export let info: string = "";
  export let infoPos: 'top' | 'bottom' | 'left' | 'right' = 'top';
  export let error: string = "";
  export let errorTimeOut = 5000;
  export let required: boolean = false;
  export let disabled: boolean = false;

  const iconSize = multiplySize(size, 1.5);

  const dispatch = createEventDispatcher();
  const minSearchLength = 3;

	let _selected = new Set(selected);
  let optionFilter = "";

	if (!options) throw new Error('Options are required for <Multicheckbox />');
	if (selected.length !== _selected.size) throw new Error('Selected options are not unique');

	if (!selected.every((select) => options.map((opt) => opt.value).includes(select)))
		throw new Error('Selected options are not in options');

	let _options = options.map((option) => {
		return { ...option, selected: selected.includes(option.value) || option.selected };
	});

  onMount(()=>{
    options.forEach((option)=>{
      if(option.selected){
        _selected.add(option.value)
        selected = Array.from(_selected);
      }
    })
  })

  const setValue = (value: any, checked: boolean) => {
    _options = _options.map((opt) => {
			if (deepEqual(opt.value, value)) {
				checked ? _selected.add(value) : _selected.delete(value);
				selected = Array.from(_selected);
				return { ...opt, selected: checked };
			}
			return opt;
		});
  };

	const handleCheck = (event: CustomEvent, value: any) => {
		const { checked } =  event.detail;
    setValue(value, checked);
    dispatch('change', {
      name,
      value: Array.from(_selected).map(sel=>options.find(opt=>opt.value ===sel)),
      selected: Array.from(_selected)
    });
	};

	const handleCancel = () => {
		_selected = new Set([]);
		dispatch('cancel');
	};

	const handleAccept = () => {
		dispatch('accept', {
			selected: Array.from(_selected)
		});
	};

  let optionToShow: CheckboxOption[] = [];

  $: {
      optionToShow = optionFilter.length >= minSearchLength
        ? _options.filter((opt) => opt.label.toLowerCase().includes(optionFilter.toLowerCase()))
        : [..._options];
    }

  const handleReset = () => {
    _selected = new Set([]);
    _options = _options.map(opt=>({...opt, selected: false}));
    optionFilter = "";
  }

  const handleSelectAll = () => optionToShow.forEach((opt) => setValue(opt.value, true));

</script>

<div
  class="multicheckbox-container"
  style={`
    --max-height: ${maxHeight};
    --size: ${size};
  `}
>
  <InputLabel {label} {required} {info} {id} {size} {infoPos} {error} {disabled}/>
  {#if hasFilter}
    <TextInput
      icon="Search"
      name="search"
      width="100%"
      placeholder="Filter"
      {disabled}
      bind:value={optionFilter}
      {size}
    />
  {/if}
	{#if optionToShow.length === 0}
		<p class="no-options">No options</p>
	{:else}
      <ScrollableContainer>
        {#each optionToShow as option (option.value)}
          <div
            class="checkbox-container"
            animate:flip={{duration: 200}}
          >
            <Checkbox
              on:change={(e)=>handleCheck(e, option.value)}
              {size}
              {disabled}
              id={option.value}
              checked={option.selected}
              label={option.label}
              info={option.info}
            />
          </div>
        {/each}
      </ScrollableContainer>
	{/if}
  {#if hasControls}
    <div class="actions">
      {#if optionToShow.length > 0}
        <button class="action selectAll" on:click={handleSelectAll}>
          <Icon icon="SelectAll" size={iconSize} />
        </button>
        <button class="action reset" on:click={handleReset}>
          <Icon icon="DeselectAll" size={iconSize} />
        </button>
        <button class="action accept" on:click={handleAccept}>
          <Icon icon="CheckInCircle" size={iconSize} />
        </button>
      {/if}
      <button class="action cancel" on:click={handleCancel}>
        <Icon icon="Cancel" size={iconSize} />
      </button>
    </div>
  {/if}
  <InputError bind:error {size} timeOut={errorTimeOut}/>
</div>

<style lang="scss">
	.multicheckbox-container {
		display: flex;
		flex-wrap: nowrap;
		flex-direction: column;
		gap: 0.25rem;
    max-height: var(--max-height);

    .no-options {
      white-space: nowrap;
      margin-bottom: 0.5rem;
      text-align: center;
    }

    .checkbox-container {
      display: flex;
      flex-wrap: nowrap;

      input {
        margin: 0 0.5rem 0 0;
        padding: 0;
      }
    }
  }

  .actions {
    display: flex;
    flex-wrap: nowrap;
    flex-direction: row;
    justify-content: flex-end;

    .action {
      margin: 0;
      padding: 0;
      border: 0;
      background-color: transparent;
      outline: 0;
      cursor: pointer;
      transition: scale 0.2s ease;
      color: var(--primary);

      &.accept {
        color: var(--success);
      }

      &.cancel {
        color: var(--danger);
      }

      &:hover {
        scale: 1.1;
      }
    }
  }
</style>
