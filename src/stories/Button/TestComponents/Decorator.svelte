<script lang="ts">
  export let bgColor: string = "red";
</script>

<div style="background-color: {bgColor};padding: 1rem">
  <slot/>
</div>