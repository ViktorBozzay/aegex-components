<script lang="ts">
  import TextInput from "./TextInput.svelte";

  import { validateDimensionStyle } from "../../../utils/validateDimensionStyle.js";

  export let value: string = "";
  export let name: string;
  export let label: string;
  export let width: string = "100%";

  if (!validateDimensionStyle(width))
    throw new Error("Invalid width dimension style for <Password />");
</script>

<TextInput
  {...$$restProps}
  bind:value
  on:change
  on:input
  {name}
  {label}
  {width}
  required
  secret
  icon="Password"
/>