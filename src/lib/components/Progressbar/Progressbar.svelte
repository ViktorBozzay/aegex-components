<script lang="ts">
	import RollingDigits from "../RollingDigits/RollingDigits.svelte";

  import { multiplySize } from "../../utils/multiplySize.js";

  export let progression: number = 0;
  export let thickness: string = "1rem"
  export let showValue: boolean = true;
  export let label: string = "";
  export let labelInside: boolean = false;

  let fontSize = labelInside ? multiplySize(thickness, 0.75) : "1rem" ;

</script>

<div
  class="progressbar"
  style="--progress: {Math.min(progression, 100)}%; --thickness: {thickness}"
>
  {#if label}
    <div class="value" class:labelInside>
      {label} -
      {#if showValue}
          <RollingDigits bind:value={progression} size={fontSize}/>%
      {/if}
    </div>
  {/if}
  {#if showValue && !label}
    <div class="value" class:labelInside>
      <RollingDigits bind:value={progression} size={fontSize}/>%
    </div>
  {/if}
  <div class="progress" />
</div>

<style lang="scss">
  .progressbar {
    position: relative;

    .value {
      position: relative;
      top: 0;
      left: calc(var(--progress) / 2);
      width: fit-content;
      transform: translate(calc(-0.5 * var(--progress)), 0%);
      transition: all 2s ease;
      z-index: 4;

      &.labelInside {
        position: absolute;
        padding: 0 0.25rem;
        font-size: calc(var(--thickness) * 0.75);
        top: calc(var(--thickness) / 4);
      }
    }

    .progress {
      position: relative;
      box-sizing: content-box;
      width: 100%;
      height: var(--thickness);
      overflow: hidden;
      background: linear-gradient(-45deg,
      var(--primary-bg-300) 10%,
        var(--primary-bg-400) 10%,
        var(--primary-bg-400) 20%,
        var(--primary-bg-300) 20%,
        var(--primary-bg-300) 30%,
        var(--primary-bg-400) 30%,
        var(--primary-bg-400) 40%,
        var(--primary-bg-300) 40%,
        var(--primary-bg-300) 50%,
        var(--primary-bg-400) 50%,
        var(--primary-bg-400) 60%,
        var(--primary-bg-300) 60%,
        var(--primary-bg-300) 70%,
        var(--primary-bg-400) 70%,
        var(--primary-bg-400) 80%,
        var(--primary-bg-300) 80%,
        var(--primary-bg-300) 90%,
        var(--primary-bg-400) 90%,
        var(--primary-bg-400)
      );
      border: 1px solid var(--primary-shadow);
      box-shadow: 1px 2px 5px var(--primary-shadow),
                  inset 0.25rem 0.25rem 0.5rem var(--primary-bg-700),
                  inset -0.25rem -0.25rem 0.5rem var(--primary-bg-400);
      border-radius: calc(var(--thickness) / 2);
      z-index: 1;

      &:before {
        content: '';
        display: block;
        position: absolute;
        top: 0;
        left: 0;
        box-sizing: content-box;
        width: var(--progress);
        max-width: var(--progress);
        height: var(--thickness);
        border-radius: calc(var(--thickness) / 2);
        background: linear-gradient(60deg, transparent, rgba(255,255,255,0.2), transparent);
        z-index: 3;
        animation: 10s ease-out infinite progress;
      }

      &:after {
        content: '';
        display: block;
        position: absolute;
        top: 0;
        left: 0;
        box-sizing: content-box;
        width: 100%;
        max-width: var(--progress);
        min-width: var(--thickness);
        height: var(--thickness);
        border-radius: calc(var(--thickness) / 2);
        background-color: var(--success);
        z-index: 2;
        box-shadow: inset 0.25rem 0.25rem 0.5rem var(--primary-bg-400),
                    inset -0.25rem -0.25rem 0.5rem var(--primary-bg-800);
        transition: all 2s ease;
      }
    }
  }

  @keyframes progress {
    0% {
      width: 0%;
      opacity: 0;
    }
    1% {
      width: 5%;
      opacity: 1;
    }
    2% {
      width: 10%;
    }
    5% {
      left:  calc(var(--progress) - 45%);
      width: 20%;
    }
    8% {
      width: 10%;
      left:  calc(var(--progress) - 10%);
    }
    9% {
      width: 5%;
      left:  calc(var(--progress) - 5%);
    }
    10% {
      width: 0%;
      opacity: 0;
      left:  calc(var(--progress) - 0%);
    }
    100% {
      width: 0%;
    }
  }
</style>