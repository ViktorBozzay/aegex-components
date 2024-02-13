<script lang="ts">
  import { fly } from 'svelte/transition';
  import { createEventDispatcher } from 'svelte';
  import { v4 as uuid } from 'uuid';

	import InputError from './InputError.svelte';
	import InputLabel from './InputLabel.svelte';

  import type { CheckboxState } from "./types/CheckboxState.js";

  export let id: string = uuid();
  export let name: string = "";
  export let label: string = "";
  export let checked: CheckboxState = false;
  export let size: string = "1rem";
  export let error: string = "";
  export let errorTimeOut: number = 5000;
  export let threeState: boolean = false;
  export let readonly: boolean = false;
  export let disabled: boolean = false;
  export let required: boolean = false;
  export let info: string = "";
  export let infoPos: 'top' | 'bottom' | 'left' | 'right' = 'top';

  const dispatch = createEventDispatcher();

  const checkedState: CheckboxState = true
  const partialState: CheckboxState = null
  const uncheckedState: CheckboxState = false

  const threeStateOrder: CheckboxState[] = [
    checkedState,
    partialState,
    uncheckedState,
    partialState
  ];
  const twoStateOrder: CheckboxState[] = [checkedState, uncheckedState];
  const stateOrder = threeState ? threeStateOrder : twoStateOrder;

  let currentStateNr: number = stateOrder.indexOf(checked);

  const prevState = () => currentStateNr = (currentStateNr - 1) % (stateOrder.length);
  const nextState = () => currentStateNr = (currentStateNr + 1) % (stateOrder.length);

  if (!threeState && checked === null)
    throw new Error("If using two state checkbox the checkedValue cannot be 'partial' or checked null");

  const handleChange = () => {
    currentStateNr = (currentStateNr + 1) % (stateOrder.length);
    checked = stateOrder[currentStateNr];
    dispatch('change', { value: checked, name, checked, id, prevState, nextState, currentStateNr });
  }
</script>

<div class="checkbox-container" style={`--size: ${size}`}>
  <div class="checkbox-wrapper">
    <div class=checkbox>
      <input
        type="checkbox"
        class:disabled
        class:readonly
        class:error
        {id}
        {name}
        {readonly}
        {checked}
        disabled={disabled || readonly}
        on:change={handleChange}
      />

      {#if checked === checkedState}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="590.088" height="522.431" viewBox="0 0 590.088 522.431"
        >
          <g id="layer1">
            <path
              in:fly={{ duration: 200, y: -100, x: 150 }}
              out:fly={{ duration: 200, y: 100 }}
              d="M3.179,332.702 L0,331.316 C58.162,299.934 102.129,272.143 165.059,241.357 C196.247,287.963 216.275,322.209 244.491,380.721 C317.446,243.823 400.046,84.169 579.494,-0 C573.704,75.61 572.435,133.976 590.088,199.231 C450.006,268.799 337.296,390.748 256.067,520.027 L254.581,522.431 C179.674,436.203 104.663,377.515 3.179,332.702 z"
              fill="#D40000"
            />
          </g>
        </svg>
      {/if}
      {#if checked === partialState}
        <svg xmlns="http://www.w3.org/2000/svg" width="123" height="41" viewBox="0 0 123 41" fill="none">
          <path
            in:fly={{ duration: 200, x: -150 }}
            out:fly={{ duration: 200, x: 100 }}
            d="M88.4889 2.30653C52.8789 5.31153 21.9779 15.3825 1.37889 25.2335C-2.65511 27.1625 3.06989 41.7375 6.92749 40.2415C41.7255 26.7505 80.9425 21.0955 120.587 16.7865C125.217 16.2805 121.767 2.04653 118.117 0.378529C115.007 -1.04147 92.2815 1.96653 88.4935 2.30653H88.4889Z"
            fill="#D40000"
          />
        </svg>
      {/if}
    </div>

    <InputLabel {label} {required} {info} {id} {size} {infoPos} {error} {disabled}/>
  </div>

  <InputError bind:error {size} timeOut={errorTimeOut}/>
</div>


<style lang="scss">
  .checkbox-container {
    display: flex;
    flex-direction: column;
    justify-content: center;

    .checkbox-wrapper {
      display: flex;
      align-items: center;
      gap: 0.25rem;

      label {
        cursor: pointer;
      }

      .checkbox {
        width: var(--size);
        height: var(--size);
        position: relative;

        svg {
          position: absolute;
          z-index: 3;
          top: -10%;
          left: -10%;
          width: 100%;
          height: 100%;
          pointer-events: none;
        }

        input {
          width: calc(var(--size) - 3px);
          height: calc(var(--size) - 3px);
          margin: 0;
          padding: 0;
          outline: 0;
          position: relative;
          background-color: transparent;
          border-radius: 0.2rem;
          appearance: none;
          -webkit-appearance: none;
          -moz-appearance: none;
          cursor: pointer;

          &.disabled {
            &::after  {
              cursor: not-allowed;
            }
          }

          &.error {
            &::after {
              border: 2px solid var(--danger);
            }
          }

          &:after {
            position: absolute;
            box-sizing: border-box;
            margin: 0;
            padding: 0;
            top: 0;
            left: 0;
            z-index: 2;
            content: "";
            display: block;
            background-color: transparent;
            width: 100%;
            height: 100%;
            border: 2px solid var(--primary-bg-500);
            border-radius: 0.2rem;
          }
        }
      }
    }
  }
</style>