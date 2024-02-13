<script lang="ts">
  import ScrollableContainer from "../../lib/components/ScrollableContainer/ScrollableContainer.svelte";

  export let maxHeight: string = "300px";
</script>

<div style="
    max-height: {maxHeight};
    display: flex;
		flex-direction: column;
  "
  >
  <ScrollableContainer>
    <ul>
      <li>List elem 1</li>
      <li>List elem 2</li>
      <li>List elem 3</li>
      <li>List elem 4</li>
      <li>List elem 5</li>
      <li>List elem 6</li>
      <li>List elem 7</li>
      <li>List elem 8</li>
      <li>List elem 9</li>
      <li>List elem 10</li>
    </ul>
  </ScrollableContainer>
</div>