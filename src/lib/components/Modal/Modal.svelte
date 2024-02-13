<script lang="ts">
  import { fade } from 'svelte/transition'
  import { createEventDispatcher } from "svelte";

	import CloseButton from "../Buttons/Special/CloseButton/CloseButton.svelte";
	import ScrollableContainer from "../ScrollableContainer/ScrollableContainer.svelte";

	import { move } from "../../actions/move.js";
  import { portal } from "../../actions/portal.js";
	import { keyPress } from "../../actions/keyPress.js";

	import type { ModalPositions } from "../../components/Modal/ModalProps.js";

  import { modalPositions } from "../../components/Modal/modalPositions.js";

  export let title: string = "";
  export let isOpen = false;
  export let closeOnEsc = true;
  export let closeOnBackdropClick = false;
  export let draggable = false;
  export let position = "center";

  const postStr = modalPositions[position as keyof ModalPositions];

  const dispatch = createEventDispatcher()

  const handleClose = () => {
    isOpen = false;
    dispatch("close")
  }
  $: if (isOpen) dispatch("open")

  const handleOpen = () => isOpen = true
</script>

<!-- TODO: find oit how to make keyPress action conditionally  -->
<!-- TODO: find a correct type for keyPress action -->
{#if isOpen}
  <div
    class="modal"
    use:portal={"modal-portal"}
    use:keyPress={{ key: closeOnEsc ? "Escape" : "", action: handleClose }}
  >
    <!-- svelte-ignore a11y-click-events-have-key-events -->
    <div
      class="backdrop"
      transition:fade={{duration: 200}}
      tabindex="0"
      role="button"
      on:click={closeOnBackdropClick ? handleClose : undefined}
    />
    <!-- TODO: find out how to add drag action conditionally acc. to props.draggable  -->
    <!-- TODO: move action cannot be used on modals, because the modal appearing in worn position (off-screen) -->
    <!-- svelte-ignore a11y-click-events-have-key-events -->
    <!-- use:move={{
      addPlaceholder: true,
      moveWithResize: true,
      addReset: false,
    }} -->
    <div
      class="content-wrapper"
      style="{postStr}"
      transition:fade={{duration: 200, delay: 100}}
    >
      <ScrollableContainer>
        {#if !closeOnBackdropClick}
          <CloseButton on:click={handleClose} />
        {/if}
        <div class="modal-header grabber">
          <h2>{title}</h2>
        </div>

        <div class="modal-body">
          <slot name="content" />
        </div>

        <div class="modal-footer">
          <slot name="footer" />
        </div>
      </ScrollableContainer>
    </div>
  </div>
{/if}

<style lang="scss">
  .modal {
    z-index: var(--modal-z-index);
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100vh;

    // display: flex;
    // justify-content: center;
    // align-items: center;

    .backdrop {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background-color: rgba(0, 0, 0, 0.4);
      backdrop-filter: blur(2px);
    }
    .content-wrapper {
      max-width: 70%;
      position: absolute;
      // position: relative;
      border-radius: 0.3rem;
      padding: 1rem 2rem;
      background-color: var(--primary-bg);
      box-shadow: 1px 2px 5px var(--primary-shadow);
      overflow: hidden;

      .modal-body {
        max-height: 70%;
        overflow: auto;
      }
      .modal-footer {
        position: relative;
      }
    }
  }
</style>
