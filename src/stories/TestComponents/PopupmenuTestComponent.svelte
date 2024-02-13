<script lang="ts">
	import Button from '../../lib/components/Buttons/General/Button.svelte';
  import Popupmenu from '../../lib/components/Popupmenu/Popupmenu.svelte';

  export let tooltipText: string | undefined = undefined;
  export let isOpen = false;
  export let zIndex = 10;
</script>

<Popupmenu bind:isOpen={isOpen} {zIndex} {tooltipText}>
  <Button slot="activator">Open</Button>
  <div slot="menu" class="popup-menu">
    <p>This is a popup menu</p>
    <p>This is a popup menu</p>
    <p>This is a popup menu</p>
    <p>This is a popup menu</p>
    <p>This is a popup menu</p>
  </div>
</Popupmenu>