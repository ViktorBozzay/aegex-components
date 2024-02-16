<script lang="ts">
  import Tooltip from "$lib/components/Tooltip/Tooltip.svelte";
  import Icon from "$lib/components/Icon/Icon.svelte";

  export let label: string = "";
  export let required: boolean = false;
  export let info: string = "";
  export let id: string = "";
  export let size: string = "1rem";
  export let error: string = "";
  export let disabled: boolean = false;
  export let infoPos: 'top' | 'bottom' | 'left' | 'right' = 'top';
</script>

{#if label}
  <div
    class="label-wrapper"
    class:error
    class:disabled
  >
    <label
      class="input-label"
      class:disabled
      class:error
      style="font-size: {size};"
      for={id}
      class:required
    >
      {label}
      {#if required}
        <span class="star">*</span>
      {/if}
    </label>
    {#if info}
      <span class="info" class:required>
        <Tooltip text={info} position={infoPos} {size}>
          <Icon icon="Info" {size} />
        </Tooltip>
      </span>
    {/if}
  </div>
{/if}

<style lang="scss">
  .label-wrapper {
    position: relative;
    width: fit-content;
    white-space: nowrap;
    margin: var(--label-margin);

    &.error {
      color: var(--danger);
    }

    .info {
      position: absolute;
      // top: -0.25rem;

      &.required {
        right: calc(var(--font-size) * -1.5);
      }
    }

    &.disabled {
      cursor: not-allowed;
      .input-label {
        cursor: not-allowed;
      }
    }
  }

  .required {
    .star {
      position: absolute;
      top: -0.125rem;
      // right: -0.5rem;
      user-select: none;
      color: var(--danger);
      display: inline-block;
      animation: rotate 15s linear infinite;
      transform-origin: center calc(var(--font-size) / 2.5);
      font-size: var(--font-size);
    }
  }

  @keyframes rotate {
    from {
      transform: rotate(0deg);
    };
    to {
      transform: rotate(360deg);
    }
  }
</style>