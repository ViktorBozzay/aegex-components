<script lang="ts">
  import { writable } from 'svelte/store';
  import { setContext, type ComponentType } from "svelte";
  import { v4 as uuid } from "uuid";

	import ToastContainer from "../../components/Toast/ToastContainer.svelte";
  import { UI_CONTEXT_KEY } from "../../contexts/UI/index.js";

  import type { Toast } from '../../types/Toast.js';
	import type { UIContextType } from '../../types/UIContext.js';

  let innerWidth: number = 0;

  let toastList = writable<Toast[]>([]);

  let pageTitle = writable<string>("");
  let aside = writable<ComponentType | undefined>(undefined);

  let isXXL = writable<boolean>(false);
  let isXL = writable<boolean>(false);
  let isLG = writable<boolean>(false);
  let isMD = writable<boolean>(false);
  let isSM = writable<boolean>(false);
  let isXS = writable<boolean>(false);

  const addToast = ({text, type, timeOut = 5000}: Omit<Toast, 'id'>) => {
    toastList.update((toastList) => [ {text, id: uuid(), type, timeOut }, ...toastList]);
  }

  const removeToast = (id: string) => {
    toastList.update((toastList) => toastList.filter((toastList) => toastList.id !== id));
  }

  const setPageTitle = (title: string) => {
    pageTitle.update(() => title);
  }

  const insertAside = (element: ComponentType) => {
    aside.update(() => element);
  }

  const removeAside = () => {
    aside.update(() => undefined);
  }

  $: {
    $isXXL = innerWidth > 1640;
    $isXL = innerWidth > 1280;
    $isLG = innerWidth > 1024;
    $isMD = innerWidth > 768;
    $isSM = innerWidth > 640;
    $isXS = innerWidth > 480;
  }

  setContext<UIContextType>(UI_CONTEXT_KEY, {
    isXXL: { subscribe: isXXL.subscribe },
    isXL: { subscribe: isXL.subscribe },
    isLG: { subscribe: isLG.subscribe },
    isMD:   { subscribe: isMD.subscribe },
    isSM:   { subscribe: isSM.subscribe },
    isXS:   { subscribe: isXS.subscribe },
    innerWidth,
    toastList: { subscribe: toastList.subscribe },
    setPageTitle,
    addToast,
    removeToast,
    insertAside,
    removeAside,
    aside: { subscribe: aside.subscribe },
    pageTitle: { subscribe: pageTitle.subscribe },
  });

</script>

<svelte:window
  bind:innerWidth
/>
<ToastContainer />
<slot />