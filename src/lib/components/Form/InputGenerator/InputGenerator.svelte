<script lang="ts">
  import type { FormStoreData } from "../types/FormStoreData.js";
  import { inputTypes } from "../constants/inputTypes.js";

  export let handleField: (e: InputEvent) => void;
  export let form: FormStoreData;

  const validTypes = Object.keys(inputTypes);
  const inValidTypes = form.formFieldProps.reduce((acc, input) => {
    return (!validTypes.includes(input.type))
      ? [...acc, input.type]
      : acc
  }, []);

  if (inValidTypes.length !== 0) throw new Error(`Input fields containing invalid input types (${inValidTypes.join(", ")})! Valid types are the followings: ${validTypes.join(", ")}`)
</script>

{#each form.formFieldProps as {type, ...input}}
  <!-- {#if !inputTypes[type]}
    <h1>Invalid type specified: {type}</h1>
  {/if} -->
  <svelte:component
    this={inputTypes[type]}
    {...input}
    value={form.values[input.name]}
    error={form.errors[input.name]}
    on:input={handleField}
    on:change={handleField}
  />
{/each}