<script lang="ts">
  import { Button, Input } from '@significa/svelte-ui';
  import Name from './name.svelte';
  import { bugStore } from '$lib/stores/store';

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

{#if !$bugStore.userName}
  <div>
    <form on:submit|preventDefault={onSubmit}>
      <h1 class="text-6xl">Howdy</h1>
      <p class="mt-1 max-w-md">
        You can use this platform to report any issue directly to the team.
        Please try to include as much information as possible. Ask your Project
        Manager for your codes to get started.
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
