<script lang="ts">
  import { fade } from 'svelte/transition';

	import { clickOutside } from '../../actions/clickOutside.js';
	import { clickInside } from '../../actions/clickInside.js';
	import { portal } from '../../actions/portal.js';

  export const size = 16;

  let isHMBOpen = false;

  const handleClick = () => {
    isHMBOpen = false;
  };
</script>

<!-- TODO: use size instead of fix 16px in the scss -->
<label
  class="hmb-menu"
  style={`
    --menu-size: ${size}px;
    --bar-height: ${size * 0.25}px;
    --bar-width: ${16 * 1.25}px;
    --bar-gap: ${16 * 0.3}px;
    --menu-size: ${16 * 1.5}px;
    --hmb-height: ${3 * (size * 0.25) + 2 * (16 * 0.3)}px;
    --x-width: calc(var(--hmb-height) * ${Math.sqrt(2)});
    `}
>
  <input
    bind:checked={isHMBOpen}
    type="checkbox"
  />
</label>

{#if isHMBOpen}
  <div
    class="menu-container"
    transition:fade={{duration: 200 }}
    use:portal={'modal-portal'}
    use:clickOutside={{exclude: ['hmb-menu']}}
    on:outsideClick={handleClick}
    use:clickInside
    on:insideClick={handleClick}
  >
    <slot />
</div>
{/if}


<style lang="scss">
  .hmb-menu {
    --animation: 300ms ease-in-out;

    display: flex;
    flex-direction: column;
    gap: var(--bar-gap);
    width: var(--menu-size);
    height: var(--menu-size);
    cursor: pointer;

    position: relative;
    left: 0.25rem;
    top: 0.25rem;

    & input {
      appearance: none;
      padding: 0;
      margin: 0;
      pointer-events: none;
    }

    & input:checked {
      opacity: 0;
      width: 0;
      transition: all var(--animation);
    }

    &:has(input:checked)::before {
      rotate: 45deg;
      width: var(--x-width);
      translate: 0 calc(var(--bar-height) / -2);
      transition: all var(--animation);
    }

    &:has(input:checked)::after {
      rotate: -45deg;
      width: var(--x-width);
      translate: 0 calc(var(--bar-height) / 2);
      transition: all var(--animation);
    }

    &::before,
    &::after,
    & input {
      content: "";
      height: var(--bar-height);
      width: var(--bar-width);
      background-color: var(--primary-text);
      border-radius: 300rem;
      transform-origin: left center;
      transition: all var(--animation),
    }
  }

  .menu-container {
    z-index: var(--hamburger-z-index);
    position: fixed;
    top: 4rem;
    right: 1rem;
    padding: 1rem 2rem;
    background-color: var(--primary-bg);
    color: var(--primary-text);
    box-shadow: 0 0 10px var(--primary-shadow);
    border-radius: 0.5rem;

    @media screen and (max-width: 480px) {
      top: 0;
      right: 0;
      left: 0;
      bottom: 0;
      padding: 2rem;
      border-radius: 0;
    }
  }
</style>