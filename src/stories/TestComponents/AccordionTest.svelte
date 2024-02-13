<script lang="ts">
  import Accordion from "../../lib/components/Accordion/Accordion.svelte";
</script>

<Accordion>
  <svelte:fragment slot="title">
    <h1>Header</h1>
  </svelte:fragment>
  <svelte:fragment slot="content">
    <div>
      <h2>Content</h2>
      <p>Content</p>
      <p>Content</p>
    </div>
  </svelte:fragment>
</Accordion>