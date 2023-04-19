<script lang="ts">
  import {
    toast,
    Toaster,
    ToastNotification,
    ThemeSwitch
  } from '@significa/svelte-ui';
  import { beforeNavigate } from '$app/navigation';
  import bugIcon from '../components/ui/icons/bug.svg?raw';
  import { theme } from '$lib/stores/theme';
  beforeNavigate(() => {
    toast.clearAll();
  });
</script>

<div class="container px-container @container px-8 max-w-xl mx-auto">
  <div class="flex py-8 justify-between">
    <span class="flex">
      <i data-icon="bug" aria-hidden="true">
        {@html bugIcon}
      </i>
      <p class="font-bold text-xl ml-2">Significa Bug Reporter</p>
    </span>
    <div class="flex">
      <ThemeSwitch theme={$theme} on:toggle={theme.toogle} />
    </div>
  </div>
  <slot />
  <Toaster component={ToastNotification} />
</div>
