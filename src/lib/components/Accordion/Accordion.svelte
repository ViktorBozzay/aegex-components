<script lang="ts">
	import { slide } from "svelte/transition";
  import Icon from "../Icon/Icon.svelte";

  let expanded: boolean = false;

  const toggleExpansion = () => expanded = !expanded;
</script>

<div class="accordion">
  <div class="title">
    <div class="handler">
      <button type="button" class="arrow-button" on:click={toggleExpansion}>
        <span class="arrow" class:expanded>
          <Icon icon="FilledTriangle" size="0.5rem"/>
        </span>
      </button>
    </div>
    <slot name="title"/>
  </div>

  {#if expanded}
    <div
      transition:slide
      role="region"
      aria-label="Content"
      aria-hidden={!expanded}
    >
      <slot name="content"/>
    </div>
  {/if}
</div>

<style lang="scss">
  .title {
    --decor-size: 1rem;
    --decor-color: var(--primary);
    display: flex;
    align-items: center;

    .handler {
        width: var(--decor-size);
        height: var(--decor-size);
        flex-shrink: 0;
        margin-right: 0.5rem;
        display: flex;
        justify-content: center;
        align-items: center;
        background-color: var(--decor-color);
        border-radius: 50%;
        z-index: 2;

        .arrow-button {
          outline: none;
          border: none;
          padding: 0;
          margin: 0;
          background-color: transparent;
          cursor: pointer;

        .arrow {
          display: block;
          font-size: 0.5rem;
          transition: all 0.3s ease-in-out;
          color: var(--primary-bg);
          transform: rotate(90deg);

          &.expanded {
            transform: rotate(-180deg);
            transition: all 0.3s ease-in-out;
          }
        }
      }
    }
  }
</style>