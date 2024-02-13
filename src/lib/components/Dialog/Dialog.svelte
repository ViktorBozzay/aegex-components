<script lang="ts">
  import { fade } from 'svelte/transition'
  import { createEventDispatcher } from "svelte";

	import CloseButton from "../Buttons/Special/CloseButton/CloseButton.svelte";
  import ScrollableContainer from "../ScrollableContainer/ScrollableContainer.svelte";

  export let title: string = "";
  export let isOpen = false;
  export let closeOnBackdropClick = false;

  let modalRef: HTMLDialogElement;

  const dispatch = createEventDispatcher()

  $: if (isOpen) dispatch("open")
  $: (isOpen) ? modalRef?.showModal() : modalRef?.close();

  const handleClose = () => {
    isOpen = false;
    dispatch("close")
  }
  const handleOpen = () => isOpen = true
</script>

{#if isOpen}
  <dialog
    bind:this={modalRef}
    data-modal
    class="content-wrapper"
    in:fade={{duration: 200, delay: 100}}
    out:fade={{duration: 200, delay: 100}}
  >
    {#if !closeOnBackdropClick}
      <CloseButton on:click={handleClose} />
    {/if}
    <div class="modal-header grabber">
      <h2>{title}</h2>
    </div>

    <ScrollableContainer>
      <slot name="content" />
    </ScrollableContainer>

    <div class="modal-footer">
      <slot name="footer" />
    </div>
  </dialog>
{/if}

<style lang="scss">
  .content-wrapper {
    border-radius: 0.3rem;
    padding: 1rem 2rem;
    background-color: var(--primary-bg);
    overflow: hidden;
    box-shadow: 1px 2px 5px var(--primary-shadow);
    border: none;

    &::backdrop {
      background-color: rgba(0, 0, 0, 0.4);
      backdrop-filter: blur(2px);
    }

  }
</style>
