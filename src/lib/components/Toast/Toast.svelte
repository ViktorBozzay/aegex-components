<script lang="ts">
  import { fly } from 'svelte/transition';
  import { createEventDispatcher, onMount } from 'svelte';

  import type { Toast } from '../../types/Toast.js';
	import CloseButton from '../Buttons/Special/CloseButton/CloseButton.svelte';

  export let toast: Toast
  const {type, timeOut} = toast

  const dispatchEvent = createEventDispatcher();
  const intervalStep = 1000 / 16;
  let elapsedTime = 0;

  const handleRemove = () => {
    dispatchEvent("remove", { id: toast.id })
  }

  $: {
    if (elapsedTime >= timeOut) {
      dispatchEvent("remove", { id: toast.id })
    }
  }

  onMount(() => {
    if (timeOut) {
      const i = setInterval(() => {
        elapsedTime += intervalStep;
      }, intervalStep)
      return () => {
        clearInterval(i)
      }
    }
  })

</script>

<div
  class="toast-container"
  in:fly={{x:220}}
  out:fly={{x:220}}
>
  <div
    class="toast"
    class:error={type === "error"}
    class:success={type === "success"}
    class:warning={type === "warning"}
  >
    <CloseButton on:click={handleRemove} />
    <div
      class="toast-text"
    >
      {toast.text}
    </div>
    <div class="progress-container">
      <div
      class="progress"
      style="width: {100 - elapsedTime/timeOut * 100}%"
      >
    </div>
  </div>
  </div>
</div>

<style lang="scss">
  .toast-container {
    display: flex;
    flex-direction: row;

    .toast {
      --progress-bar-height: 6px;
      --progress-bar-x-offset: 10px;
      --progress-bar-y-offset: 8px;
      --toast-bottom-offset: calc(var(--progress-bar-height) + var(--progress-bar-y-offset));

      position: relative;
      padding: 1rem 2rem calc(1rem + var(--toast-bottom-offset)) 2rem;
      margin: 0.5rem 1rem;
      min-width: 10rem;
      min-height: 3rem;
      border-radius: 3px;
      background-color: var(--primary-bg);
      color: var(--primary-text);
      box-shadow: 1px 2px 5px var(--primary-shadow);
      overflow: hidden;

      .progress-container {
        position: absolute;
        bottom: var(--progress-bar-y-offset);
        left: var(--progress-bar-x-offset);
        right: var(--progress-bar-x-offset);

        .progress {
          height: var(--progress-bar-height);
          border-radius: 3px;
          background-color: var(--primary-text-100);
        }
      }

      &::after {
        content: "";
        position: absolute;
        top: 0;
        left: 0;
        width: 5px;
        height: 100%;
        background: #000;
        overflow: hidden;
      }

    }
    .warning::after {
      background-color: var(--warning);
    }

    .success::after {
      background-color: var(--success);
    }

    .error::after {
      background-color: var(--error);
    }
  }

</style>