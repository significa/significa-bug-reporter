<script lang="ts">
  import { Button, Input } from '@significa/svelte-ui';
  import Name from './name.svelte';
  import { bugStore } from '$lib/store';
  import bugIcon from './ui/icons/bug.svg?raw';
  import Switch from './ui/switch.svelte';

  function onSubmit(e: any) {
    const formData = new FormData(e.target);

    const data: any = {};
    for (let field of formData) {
      const [key, value] = field;
      data[key] = value;
    }
    bugStore.setUser(data.name);
  }
</script>

<div class="flex justify-center flex-col">
  <div class="flex py-8 justify-between">
    <span class="flex">
      <i data-icon="bug" aria-hidden="true">
        {@html bugIcon}
      </i>
      <p class="font-bold text-xl ml-2">Significa Bug Reporter</p>
    </span>
    <div class="flex">
      <Switch />
    </div>
  </div>

  {#if !$bugStore.userName}
    <div>
      <form on:submit|preventDefault={onSubmit}>
        <h1 class="text-6xl">Howdy</h1>
        <p class="mt-1 max-w-md">
          You can use this platform to report any issue directly to the team.
          Please try to include as much information as possible. Ask your
          Project Manager for your codes to get started.
        </p>
        <p class="font-bold my-2">Start by telling us your name</p>
        <Input
          class="mt-1"
          type="text"
          name="name"
          value=""
          placeholder="Your name"
        />
        <div class="justify-end mt-4">
          <Button type="submit" variant="primary" arrow>Continue</Button>
        </div>
      </form>
    </div>
  {:else}
    <Name />
  {/if}
</div>
