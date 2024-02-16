<script lang="ts">
  import { createEventDispatcher } from "svelte";

	import InputError from "./InputError.svelte";
  import InputLabel from "./InputLabel.svelte";
  import Icon from "../../Icon/Icon.svelte";

  import { inputStyles } from "./constants/inputStyles.js";
  import type { Colors } from '../../../types/Colors.js'; //TODO fix import here

  export let id: string = "";
  export let name: string;
  export let value: string = "";
  export let label: string = "";
  export let labelPos: "left" | "right" | "top" | "bottom" = "top";
  export let error: string = "";
  export let placeholder: string = "";
  export let size: string = "1rem";
  export let width: string = "250px";
  export let color: Colors = 'primary';
  export let icon: string = "";
  export let iconRight: boolean = false;
  export let resize: "auto" | "vertical" | "horizontal" | "none" | "both" = "both";
  export let info: string = "";
  export let infoPos: 'top' | 'bottom' | 'left' | 'right' = 'top';
  export let required: boolean = false;
  export let disabled: boolean = false;
  export let readonly: boolean = false;
  export let loading = false;
  export let errorTimeOut: number = 5000;

  const dispatch = createEventDispatcher();

  const handleChange = (e: any) => {
    value = (e.target).value;
    dispatch("input", {name, value});
    dispatch("change", {name, value});
    error = ""
  };

  const styleStr = `
    --flex-direction: ${inputStyles[labelPos].flexDir};
    --font-size: ${size};
  `;
</script>

<div class="field-container" style={styleStr}>
  <div
    class="input-container"
    class:error
  >
    <div
      class="label-wrapper"
      class:iconRight
    >
      <button>
        <Icon icon={loading ? 'Loading' : icon} {color} {size} />
      </button>
      <InputLabel {label} {required} {info} {id} {size} {infoPos} {error} {disabled}/>
    </div>
    <div
      class="textarea-wrapper"
      class:disabled
      class:error
    >
      <textarea
        style="resize: {resize}; font-size: {size};"
        {disabled}
        {readonly}
        {required}
        {placeholder}
        {id}
        {name}
        bind:value
        on:input={handleChange}
        on:change={handleChange}
      />
    </div>
  </div>
  <InputError bind:error {size} timeOut={errorTimeOut}/>
</div>

<style lang="scss">
  @import "../../../styles/scrollbar.scss";

  .field-container {
    display: inline-flex;
    flex-direction: column;
    margin: 0;
    gap: 0.25rem;
    transition: all 0.2s ease;

    .input-container {
      display: inline-flex;
      flex-direction: var(--flex-direction);
      border: 1px solid var(--primary-shadow);
      border-radius: 0.5rem;
      box-shadow: 1px 2px 5px var(--primary-shadow);
      transition: all 0.2s ease;
      overflow: hidden;

      &.error {
        border-color: var(--danger);
        textarea::placeholder {
          color: var(--danger);
        }

        .label-wrapper {
          border-color: var(--danger);

        button {
          color: var(--danger);
          border-right-color: var(--danger);
        }
        }
      }

      .label-wrapper {
        display: flex;
        align-items: center;
        box-sizing: border-box;
        width: 100%;
        background-color: var(--primary-bg-800);
        border-bottom-width: 1px;
        border-bottom-style: solid;
        border-bottom-color: var(--primary-border);
        gap: 0.5rem;

        button {
          display:flex;
          justify-content: center;
          align-items: center;
          width: calc(--font-size * 1.5);
          height: calc(--font-size * 1.5);
          padding: 0.25rem;
          background-color: transparent;
          border: none;
          border: 1px solid transparent;
          border-right-color: var(--primary-border);
          outline: none;
        }


        &.iconRight {
          flex-direction: row-reverse;
          justify-content: space-between;
          padding-left: calc(var(--font-size) / 2);

          button {
            border-right-color: transparent;
            border-left-color: var(--primary-border);
          }
        }
      }

      .textarea-wrapper {
        display: inline-flex;
        padding: 0.5rem 1rem;

        &.error {
          border-color: var(--danger);
          textarea::placeholder {
            color: var(--danger);
          }
        }
        &.disabled {
          textarea {
            cursor: not-allowed;
          }
        }
        textarea {
          outline: none;
          border: none;
          padding-right: 0.5rem;
          background-color: var(--primary-bg);
          font-size: var(--size)px;
          width: calc(100% - 0.75rem);
          height: calc(100% - 0.75rem);
        }
      }
    }
  }


</style>