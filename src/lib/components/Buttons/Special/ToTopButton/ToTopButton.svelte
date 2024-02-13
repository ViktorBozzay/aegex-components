<script lang="ts">
  import { fly } from 'svelte/transition';

  import Icon from '../../../Icon/Icon.svelte';

  let visible = false;

  const handleScroll = () => {
    visible = (window.scrollY > 200);
  };

  const scrollUp = () => {
    document.body.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
</script>

{#if visible}
  <button
    in:fly={{ x: 200, duration: 200 }}
    out:fly={{ y: -100, duration: 200 }}
    class="to-top-container"
    on:click={scrollUp}
  >
    <Icon icon="ArrowUp" size={24} />
  </button>
{/if}

<svelte:window on:scroll={handleScroll} />

<style lang="scss">
  .to-top-container {
    display: flex;
    align-items: center;
    justify-content: center;
    position: fixed;
    bottom: 1rem;
    right: 1rem;
    background-color: var(--primary-bg);
    color: var(--primary-text);
    box-shadow: 1px 2px 5px var(--primary-shadow);
    border-radius: 50%;
    width: 3rem;
    height: 3rem;
    cursor: pointer;
    z-index: var(--to-top-z-index);
    opacity: 0.2;
    transition: all 0.2s ease-in-out;
    border: 0;
    outline: 0;

    &:hover {
      opacity: 1;
      animation: alternate pulse 1s infinite;
    }

    @keyframes pulse {
      0% {
        transform: scale(1);
      }
      80% {
        transform: scale(1);
      }
      90% {
        transform: scale(1.1);
      }
      100% {
        transform: scale(1);
      }
    }
  }
</style>