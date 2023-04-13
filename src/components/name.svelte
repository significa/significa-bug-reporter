<script>
  // @ts-nocheck

  /**
   * @type {string}
   */
  export let user;
  import { TextButton } from '@significa/svelte-ui';
  import Form from './form.svelte';
  import { bug } from '$lib/store';

  //redirect after logout / fix store update
  function onClick() {
    bug.setUser(null);
  }
</script>

<div>
  <div class="p-4" style="background: #FFD324">
    <h2>Reporting as {user}</h2>
    <TextButton on:click={onClick}>Log out</TextButton>
  </div>
  <Form />
</div>
