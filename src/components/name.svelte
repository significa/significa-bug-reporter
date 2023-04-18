<script lang="ts">
  import { TextButton } from '@significa/svelte-ui';
  import Form from './form.svelte';
  import { bugStore } from '$lib/store';
</script>

<div class="pb-8">
  <div class="p-4" data-theme="yellow">
    <h2>Reporting as {$bugStore.userName}</h2>
    <TextButton on:click={() => bugStore.setUser(null)}>Log out</TextButton>
  </div>
  <Form />
</div>
