<script lang="ts">
  import sun from './icons/sun.svg?raw';
  import moon from './icons/moon.svg?raw';
  import { theme } from '$lib/theme';

  let check = $theme === 'dark';
</script>

<label class="wrapper">
  <i data-icon="sun" class="sun" aria-hidden="true">
    {@html sun}
  </i>
  <i data-icon="moon" class="moon" aria-hidden="true">
    {@html moon}
  </i>
  <input
    type="checkbox"
    id="switch"
    bind:checked={check}
    on:change={theme.toogle}
  />
  <div class="circle">
    <div class="circleInner">
      <i data-icon="moon" class="moon2" aria-hidden="true">
        {@html moon}
      </i>
      <i data-icon="sun" class="sun2" aria-hidden="true">
        {@html sun}
      </i>
    </div>
  </div>
</label>

<style>
  .sun {
    position: absolute;
    top: 5px;
    left: 5px;
    pointer-events: none;

    transition: var(--transition-motion);
  }

  .moon {
    position: absolute;
    top: 5px;
    right: 5px;
    pointer-events: none;
    transition: var(--transition-motion);
  }

  input[type='checkbox'] {
    height: 0;
    width: 0;
    visibility: hidden;
  }

  .wrapper {
    position: relative;
    display: flex;
    width: fit-content;
    cursor: pointer;
    width: 50px;
    height: 26px;
    background: hsl(var(--color-background-offset));
    display: flex;
    border-radius: 100px;
  }

  .circle {
    position: absolute;
    top: 1px;
    left: 1px;
    width: 24px;
    height: 24px;
    background: hsl(var(--color-background));
    border-radius: 90px;
    overflow: hidden;
    transition: 0.3s;
  }

  .circleInner {
    width: 100%;
    height: 100%;
    transform: translateX(-100%);
    align-items: center;
    gap: 10px;
    padding: 4px 2px;
    transition: transform 0.5s;
  }

  input[type='checkbox']:checked + .circle .circleInner {
    transform: translateX(0px);
  }

  input:checked + .circle {
    left: calc(100% - 1px);
    transform: translateX(-100%);
  }

  .moon2 {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }

  .sun2 {
    position: absolute;
    top: 50%;
    left: 83%;
    transform: translate(-50%, -50%) translateX(100%);
  }
</style>
