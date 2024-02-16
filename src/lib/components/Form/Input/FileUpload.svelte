<script lang="ts">
  import { createEventDispatcher } from 'svelte';
  import { fade } from 'svelte/transition';
  import { v4 as uuid } from 'uuid';

  import IconButton from '../../Buttons/IconButton/IconButton.svelte';
	import Icon from '../../Icon/Icon.svelte';
	import InputError from './InputError.svelte';
	import InputLabel from './InputLabel.svelte';

  import { advancedFileUploadTests } from '../../../utils/advancedFileUploadTests.js'
	import { multiplySize } from '../../../utils/multiplySize.js';

  export let id: string = uuid();
  export let name: string;
  export let label: string = "";
  export let labelPos: "left" | "right" | "top" | "bottom" = "top";
  export let info: string = "";
  export let infoPos: 'top' | 'bottom' | 'left' | 'right' = 'top';
  export let accept: string[] = ['jpg', 'jpeg', 'png', 'webp'];
  export let error: string = ""
  export let errorTimeOut = 5000
  export let value: File[] = [];
  export let size: string = "1rem";
  export let multiple = false;
  export let disabled = false;
  export let required = false;
  export let loading = false;

  const dispatch = createEventDispatcher();

  let inputRef: HTMLInputElement;
  let _accept = accept.map(ext=>ext.toLowerCase())

  const advancedUpload = advancedFileUploadTests();

  let isDragOver = false;
  let isListOpen = false;

  const handleStartDrag = () => isDragOver = true;
  const handleStopDrag = () => isDragOver = false;

  const handleAddFile = (e: DragEvent | Event) => {
    handleStopDrag();
    if (disabled || loading) return;

    const rawFiles = (e instanceof DragEvent
      ? e?.dataTransfer?.files
      : (e?.target as HTMLInputElement)?.files) ?? [];

    const checkFiles = (file: File) => {
      const ext = file.name.split(".").at(-1) ?? "";
      const added = value.map(file => file.name);

      if ((_accept.includes(ext.toLowerCase()) || _accept.length === 0) && !added.includes(file.name)) value.push(file); else
        wrongFiles.push(file.name);
    }

    const fileArr = Array.from(rawFiles);
    let wrongFiles: string[] = [];

    if (multiple) {
      fileArr.forEach(file => checkFiles(file));
    } else {
      value = [];
      checkFiles(fileArr[0]);
      if (fileArr.length > 1)
        error = "You can only upload one file at a time!";
    };

    if (value.length > 0) isListOpen = true

    if (wrongFiles.length > 0) error = `File${wrongFiles.length > 1 ? "s" : ""}: ${wrongFiles.join(", ")} not accepted!`;

    inputRef?.files?.length && (inputRef.value = '');
    dispatch("change", {name, value});
  }

  const handleListOpen = () => (isListOpen = !isListOpen)
  const handleRemoveFile = (fileToRemove: File) => {
    value = value.filter(file => file.name !== fileToRemove.name)
    if (value.length === 0) isListOpen = false;
    error=""
  }
</script>

<div class="file-input-container">
  <InputLabel {label} {required} {info} {id} {size} {infoPos} {error} {disabled}/>
  <div
    class="droparea"
    role="form"
    class:advancedUpload
    class:isDragOver={isDragOver}
    on:dragend|preventDefault|stopPropagation={handleStopDrag}
    on:dragover|preventDefault|stopPropagation={handleStartDrag}
    on:dragenter|preventDefault|stopPropagation={handleStartDrag}
    on:dragleave|preventDefault|stopPropagation={handleStopDrag}
    on:drop|preventDefault|stopPropagation={handleAddFile}
  >
    <div class="file-input">
      <label for={id}>
        <span>Choose a file</span>
      </label>
      {#if advancedUpload}
        <span class="box-dragndrop">or drag it here.</span>
      {/if}
      <input

        on:change={handleAddFile}
        bind:this={inputRef}
        {multiple}
        {id}
        accept={`.${_accept.join(",.")}`}
        type="file"
        name="files[]"
        data-multiple-caption="{value?.length ?? 0}
        files selected"
      />
      <!-- <button class="box__button" type="submit">Upload</button> -->
    </div>

    {#if isListOpen && value.length > 0}
      <div
        class="file-list"
        in:fade={{ duration: 300 }}
        out:fade={{ duration: 300 }}
      >
        {#each value as file (file.name)}
          <div class="file-list-item">
            <Icon icon="File" />
            <span>{file.name}</span>
            <IconButton noShadow on:click={()=>handleRemoveFile(file)}>
              <Icon icon="Close"/>
            </IconButton>
          </div>
        {/each}
      </div>
    {/if}
    {#if value.length > 0}
      {#if advancedUpload}
        <div
          class="file-list-button"
          in:fade={{ duration: 300 }}
          out:fade={{ duration: 300 }}
          data-file-count={value?.length ?? 0}
        >
          <IconButton
            size={multiplySize(size, 1.5)}
            on:click={handleListOpen}
            infoText="Show / Add files"
            infoPos="left"
          >
            {#if isListOpen}
              <Icon icon="Plus" />
            {:else}
              <Icon icon="Show" />
            {/if}
          </IconButton>
        </div>
      {/if}
    {/if}
  </div>
  <InputError bind:error {size} timeOut={errorTimeOut}/>
</div>

<style lang="scss">
  .file-input-container {
    display: flex;
    flex-direction: column;
    gap: 0.25rem;
    .droparea {
      transition: all 0.3s ease;
      background-color: var(--primary-bg);

      .file-list {
        background-color: var(--primary-bg);

        .file-list-item {
          padding: 0.25rem 0.5rem;
        }
      }
    }

    .droparea.advancedUpload {
      position: relative;
      border: 1px solid transparent;
      border-radius: 0.5rem;
      transition: all 0.3s ease;
      box-shadow: 1px 2px 5px var(--primary-shadow);
      height: 15rem;

      &:hover {
        transition: all 0.3s ease;
        box-shadow: 2px 3px 8px var(--primary-shadow);
      }

      .file-input {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        gap: 0.25rem;
        height: 100%;
      }

      label {
        cursor: pointer;
        background-color: var(--secondary-bg);
        padding: 0.5rem 1rem;
        border-radius: 0.5rem;
        box-shadow: 1px 2px 3px var(--primary-shadow);
      }

      input {
        display: none;
      }

      .file-list {
        padding: 0.5rem 1rem;
        position: absolute;
        background-color: var(--primary-bg);
        opacity: 0.9;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;

        .file-list-item {
          display: inline-flex;
          align-items: center;
          padding: 0.25rem 0.5rem;
          gap: 0.25rem;
          border-radius: 0.5rem;
          box-shadow: 1px 2px 3px var(--primary-shadow);
        }
      }

      .file-list-button {
        position: absolute;
        top: 0.5rem;
        right: 0.5rem;

        &:after {
          display: flex;
          align-items: center;
          justify-content: center;
          content: attr(data-file-count);
          position: absolute;
          bottom: -0.5rem;
          right: -0.25rem;
          font-size: 0.75rem;
          background-color: var(--warning);
          font-weight: 600;
          width: 1rem;
          height: 1rem;
          border-radius: 50%;
          opacity: 0.7;
        }
      }
    }

    .isDragOver {
      background-color: green;
      animation: shadowFlash 4s ease infinite alternate;
    }
  }

  @keyframes shadowFlash {
    0% {
      box-shadow: -2px -4px 6px var(--primary-shadow);
    }
    33% {
      box-shadow: 2px -4px 6px var(--primary-shadow);
    }
    66% {
      box-shadow: -2px 4px 6px var(--primary-shadow);
    }
    100% {
      box-shadow: 2px 4px 6px var(--primary-shadow);
    }
  }
</style>