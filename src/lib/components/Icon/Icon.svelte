<script lang="ts">
  import Icon from '@iconify/svelte';
  import {iconList} from './iconList.js';

  export let icon: string = "";
  export let size: number | string = 16;
  export let rotate: number = 0;

  const checkRotate = (rotate: number) => {
    if (rotate >= 0 && rotate <= 3) return rotate;
    throw new Error("Invalid rotate value, you can give a number for e.g. {0...3}");
  };

  let _rotate = 0;
  $: _rotate = checkRotate(rotate)

  const getIconStr = (icon: keyof typeof iconList) => {
    if (iconList?.[icon]) return iconList[icon] ;
    else throw new Error(`Icon not found: ${icon}, the following icons are available: ${Object.keys(iconList).join(', ')}`);
  };

  let iconName = "Home"
  $: iconName = icon && getIconStr(icon as keyof typeof iconList);

</script>

{#if icon}
  <Icon
    {...$$restProps}
    icon={iconName}
    rotate={_rotate}
    height={size}
  />
{/if}