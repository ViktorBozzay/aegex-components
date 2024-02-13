<script lang="ts">
	import { onDestroy } from "svelte";
  import { slide } from "svelte/transition";

  export let error: string = "";
  export let size: string = "0.75rem";
  export let timeOut: number = 5000;
  const intervalStep = 1000 / 16;
  let elapsedTime = 0;
  let i: any;

  $: {
    if (!i && timeOut > 0 && error !== "") {
      i = setInterval(() => {
        elapsedTime += intervalStep;

        if (elapsedTime >= timeOut) {
          error = "";
          elapsedTime = 0;
          i && clearInterval(i);
          i = undefined;
        }
      }, intervalStep)
    }
  }

  onDestroy(() => i && clearInterval(i))
</script>

{#if error !== ""}
  <div
    class="input-error"
    style="--error-font-size: calc({size} * 0.75);"
    transition:slide
    >
    {error}
  </div>
{/if}

<style lang="scss">
  .input-error {
    margin-top: 0.25rem;
    color: var(--danger);
    font-size: var(--error-font-size);
    font-weight: 700;
  }
</style>