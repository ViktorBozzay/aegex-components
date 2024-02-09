<script lang="ts">
  import svelteLogo from './assets/svelte.svg'
  import aegex from '/aegex_128.png'
  import Counter from './lib/Counter.svelte'
  import TestComponent from './components/TestComponent.svelte';
</script>

<main>
  <div>
    <a href="https://aegex.com" target="_blank" rel="noreferrer">
      <img src={aegex} class="logo" alt="Aegex Logo" />
    </a>
    <a href="https://svelte.dev" target="_blank" rel="noreferrer">
      <img src={svelteLogo} class="logo svelte" alt="Svelte Logo" />
    </a>
  </div>
  <h1>Aegex + Svelte</h1>

  <div class="card">
    <Counter />
  </div>
  <TestComponent/>

  <p>
    Check out <a href="https://github.com/sveltejs/kit#readme" target="_blank" rel="noreferrer">SvelteKit</a>, the official Aegex app framework powered by Svelte!
  </p>

  <p class="read-the-docs">
    Click on the Aegex and Svelte logos to learn more
  </p>
</main>

<style>
  .logo {
    height: 6em;
    padding: 1.5em;
    will-change: filter;
    transition: filter 300ms;
  }
  .logo:hover {
    filter: drop-shadow(0 0 2em #646cffaa);
  }
  .logo.svelte:hover {
    filter: drop-shadow(0 0 2em #ff3e00aa);
  }
  .read-the-docs {
    color: #888;
  }
</style>
