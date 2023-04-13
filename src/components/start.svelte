<script lang="ts">
  import { Button, Input } from '@significa/svelte-ui';
  import Name from './name.svelte';
  import { bug } from '$lib/store';
  let user: string | null = null;
  function onSubmit(e: any) {
    const formData = new FormData(e.target);

    const data: any = {};
    for (let field of formData) {
      const [key, value] = field;
      data[key] = value;
    }
    bug.setUser(data.name);
  }
  const isBrowser = typeof window !== 'undefined';
  if (isBrowser) {
    let storage = localStorage.getItem('bug-reporter');
    if (storage) {
      user = JSON.parse(storage).user;
    }
  }
</script>

<div class="flex justify-center">
  {#if !user}
    <div class="p-4">
      <form on:submit|preventDefault={onSubmit}>
        <h1 class="text-6xl">Howdy</h1>
        <p class="mt-1 max-w-md">
          You can use this platform to report any issue directly to the team.
          Please try to include as much information as possible. Ask your
          Project Manager for your codes to get started.
        </p>
        <p class="font-bold mt-2">Start by telling us your name</p>
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
  {/if}
  {#if user}
    <Name {user} />
  {/if}
</div>
