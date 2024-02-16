<script lang="ts">
  import { flip } from 'svelte/animate';

	import { getUIContext } from '../../contexts/UI/index.js';
  import Toast from "./Toast.svelte";

  const { toastList, removeToast } = getUIContext();

  // TODO: find type here
  const remove = (e: any) => {
    removeToast(e.detail.id);
  }
</script>

<!-- TODO: here is some type issue -->
<div id="toast-container">
  <ul id="toast-list">
    {#each $toastList as toast (toast.id)}
      <div animate:flip>
        <Toast {toast} on:remove={remove} />
      </div>
    {/each}
  </ul>
</div>


<style lang="scss">
  #toast-container {
    background-color: transparent;
    position: fixed;
    top: 0px;
    right:0px;
    z-index: var(--toast-z-index);
    max-width: 30rem;

    #toast-list {
      display: flex;
      flex-direction: column;
      margin: 0;
      padding: 0;
      list-style: none;
    }
  }
</style>