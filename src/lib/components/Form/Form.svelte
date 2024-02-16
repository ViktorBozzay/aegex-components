<script lang="ts">
  import { createEventDispatcher } from 'svelte';

  import { createFormHandler } from "./formHandler/formHandler.js";
	import type { FormField } from './types/FormFields.js';

  export let formFieldProps: FormField[];

  const dispatch = createEventDispatcher();

  const isUniqueKey = <T, K extends keyof T>(array: T[], key: K): boolean => {
    const keys = array.map((obj) => obj[key]);
    return new Set(keys).size === keys.length;
  }

  if (!isUniqueKey(formFieldProps, "name")) throw new Error(`Form fields must have unique key: name`);

  console.log('formFieldProps', formFieldProps);

  const formStore = createFormHandler(formFieldProps);
  let { form, handleField } = formStore;

  const handleSubmit = () => {
    dispatch('submit', {form: $form});
  }
</script>

<form
  on:submit|preventDefault={handleSubmit}
>
  <slot
    name="inputs"
    {handleField}
    form={$form}
  />
  <slot>
    <hr />
  </slot>
  <slot name="submit" />
</form>


<style lang="scss">

</style>