<script lang="ts">
  import { onMount } from "svelte";

	import InputLabel from "../../Form/Input/InputLabel.svelte";
	import InputError from "../../Form/Input/InputError.svelte";

	import { getSizeUnit } from "../../../utils/getSizeUnit.js";

  export let size: string = "1rem";
  export let id: string;
  export let label: string;
  export let name: string;
  export let options: any[] = [false, true];
  export let value = options[0];
  export let info: string = "";
  export let infoPos: 'top' | 'bottom' | 'left' | 'right' = 'top';
  export let error: string = "";
  export let disabled: boolean = false;
  export let required: boolean = false;
  export let readonly: boolean = false;
  export let showValue: boolean = true;
  export let checked: boolean = false;
  export let errorTimeOut = 5000;

  let _size = 1;
  let unit = "rem";
  $: {
    let {size: __size, unit: _unit} = getSizeUnit(size);
    _size = __size;
    unit = _unit;
  }

  let toggle: HTMLButtonElement;

  const setState = (state: boolean) =>
    toggle.setAttribute('aria-checked', state ? 'true' : 'false');

  onMount(()=> {
    if (!checked && value === options[1]) checked = true;
    else if (checked && value === options[0]) value = options[1];
    setState(checked);
  })

  function handleClick(){
    if (disabled) return;
    if (readonly) return;
    if (toggle) value = options[toggle.getAttribute('aria-checked') === 'true' ? 0 : 1];
  }
</script>

<div class="toggle-container">
  <div
    class="toggle"
    style={`--font-size:${size};`}
  >
    <InputLabel {label} {required} {info} {id} {size} {infoPos} {error} {disabled}/>
    <button
      {name}
      {id}
      role="switch"
      class:disabled
      aria-checked={value === options[1]}
      bind:this={toggle}
      on:click={handleClick}
    />
    {#if showValue}
      <span class="toggle-value" class:error>{value}</span>
    {/if}
  </div>
  <InputError bind:error {size} timeOut={errorTimeOut}/>
</div>

<style lang="scss">
  .toggle-container {
    display: flex;
    flex-direction: column;

    .toggle {
      display: flex;
      align-items: center;
    }

    .toggle button {
      width: calc(var(--font-size) * 2.5);
      height: calc(var(--font-size) * 1.25);
      margin: 0 0 0 calc(var(--font-size) * 0.5);
      border-radius: calc(var(--font-size) * 2.5);
      position: relative;
      background-color: var(--primary-shadow);
      border: none;
      box-shadow: inset 0px 1px 2px 2px rgba(0, 0, 0, 0.25), inset 0px 2px 3px 4px rgba(0, 0, 0, 0.125);

      &.disabled {
        opacity: 0.6;
        cursor: not-allowed;
      }
    }

    .toggle button::before {
      content: '';
      position: absolute;
      width: var(--font-size);
      height: var(--font-size);
      top: calc(var(--font-size) * 0.125);
      right: calc(var(--font-size) * 1.35);
      background: var(--primary-bg);
      transition: transform 0.2s cubic-bezier(.87,1.36,.79,.33);
    }

    .toggle button[aria-checked='true']{
      background-color: var(--success);
      transition: background-color 0.3s ease 0.2s;
    }

    .toggle button[aria-checked='false']{
      background-color: var(--warning);
      transition: background-color 0.3s ease 0.2s;
    }

    .toggle button[aria-checked='true']::before{
      transform: translateX(calc(var(--font-size) * 1.125));
      transition: transform 0.2s cubic-bezier(.87,1.36,.79,.33);
    }

    .toggle button {
      border-radius: var(--font-size);
      transition: box-shadow 0.2s ease;
    }

    .toggle button::before {
      box-shadow: inset 0px 1px 2px 2px rgba(255, 255, 255, 0.25), inset 1px 1px 3px 5px rgba(225, 225, 225, 0.25);
      border-radius: 100%;
    }

    .toggle button:focus {
      box-shadow: 0 0px 8px var(--primary-shadow), inset 0px 1px 2px 2px rgba(0, 0, 0, 0.25), inset 0px 2px 3px 4px rgba(0, 0, 0, 0.125);
    }

    .toggle label {
      cursor: var(--cursor);
    }

    .toggle label:hover + button, .toggle button:hover {
      box-shadow: 0 0px 4px var(--primary-shadow), inset 0px 1px 2px 2px rgba(0, 0, 0, 0.25), inset 0px 3px 3px 4px rgba(0, 0, 0, 0.125);
    }

    .toggle-value {
      font-size: var(--font-size);
      display: inline-block;
      margin-left: 0.25rem;

      &.error {
        color: var(--danger);
      }

    }
  }

</style>