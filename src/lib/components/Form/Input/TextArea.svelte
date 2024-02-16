<script lang="ts">

  import { createEventDispatcher } from "svelte";

	import InputError from "./InputError.svelte";
  import InputLabel from "./InputLabel.svelte";

  import { inputStyles } from "./constants/inputStyles.js";
  import type { Colors } from '../../../types/Colors.js'; //TODO fix import here

  export let value: string = "";
  export let placeholder: string = "";
  export let size: string = "1rem";
  export let id: string = "";
  export let name: string;
  export let label: string = "";
  export let error: string = "";
  export let resize: "auto" | "vertical" | "horizontal" | "none" | "both" = "both";
  export let labelPos: "left" | "right" | "top" | "bottom" = "top";
  export let required: boolean = false;
  export let disabled: boolean = false;
  export let readonly: boolean = false;
  export let errorTimeOut = 5000;
  export let color: Colors = 'primary';
  export let width: string = "250px";
  export let info: string = "";
  export let infoPos: 'top' | 'bottom' | 'left' | 'right' = 'top';

  const dispatch = createEventDispatcher();

  const handleChange = (e: any) => {
    value = (e.target).value;
    dispatch("input", {name, value});
    dispatch("change", {name, value});
    error = ""
  };

  const styleStr = `--flex-direction: ${inputStyles[labelPos].flexDir};`;
</script>

<div class="field-container" style={styleStr}>
  <div class="input-container">
    <InputLabel {label} {required} {info} {id} {size} {infoPos} {error} {disabled}/>
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
        on:focus
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
      transition: all 0.2s ease;

      .textarea-wrapper {
        display: inline-flex;
        padding: 0.5rem;
        border: 1px solid var(--primary-shadow);
        border-radius: 0.5rem;
        box-shadow: 1px 2px 5px var(--primary-shadow);

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