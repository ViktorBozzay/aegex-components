<script lang="ts">
  import TestComponent from '../lib/components/TestComponent/TestComponent.svelte';
  import Icon from '../lib/components/Icon/Icon.svelte';
  import Accordion from '../lib/components/Accordion/Accordion.svelte';
  import Step from '../lib/components/Step/Step.svelte';
  import Tab from '../lib/components/Tab/Tab.svelte';
  import Button from '../lib/components/Buttons/General/Button.svelte';
  import DatePicker from '../lib/components/Form/Input/DatePicker.svelte';
  import Chart from '../lib/components/Chart/Chart.svelte';
	import HamburgerMenu from '$lib/components/HamburgerMenu/HamburgerMenu.svelte';
  import UIContext from '../lib/contexts/UI/UIContext.svelte';
  // import Style from '../lib/components/Style/Style.svelte';
</script>
<!-- <Style /> -->
<UIContext>
  <h1>Welcome to your GX Components Svelte component library project</h1>
  <p>The project contains StoryBook and SvelteKit pages as well.</p>
  <p>The StoryBook page hosted here: </p>
  <a href="https://viktorbozzay.github.io/aegex-components/?path=/docs/testcomponent--docs" target="_blank">Aegex Svelte Component Library</a>
  <h2>This is the very first test component:</h2>
  <TestComponent name="Viktor Bozzay" />
  <Icon icon="Home" size="2rem" />
  <Accordion>
    <p slot="title">Click here for details!</p>
    <div slot="content">
      <ul>
        <li>Item 1</li>
        <li>Item 2</li>
        <li>Item 3</li>
      </ul>
    </div>
  </Accordion>
  <Step steps={[
    {
      title: "Step 1",
      component: TestComponent,
    },
    {
      title: "Step 2",
      component: TestComponent,
    }]}
  />
  <Tab tabs={[
    {
      title: "Step 1",
      component: TestComponent,
    },
    {
      title: "Step 2",
      component: TestComponent,
    }]}
  />
  <Button infoText="This is an info button" icon="Home" on:click={() => alert('Button clicked!')}>Click me!</Button>
  <DatePicker name="lal1"/>
  <Chart type="bar" data={[{label: "Jan", value: 100}, {label: "Feb", value: 50}, {label: "Mar", value: 55}]} />
  <HamburgerMenu>
    <div>
      <p>Item 1</p>
      <p>Item 2</p>
      <p>Item 3</p>
    </div>
  </HamburgerMenu>
</UIContext>

<style lang="scss">
  @import "../lib/styles/global.scss";
</style>