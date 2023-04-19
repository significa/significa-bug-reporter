<script lang="ts">
  import '$styles/index.css';
  import Start from '$components/start.svelte';
  import { bugStore } from '$lib/stores/store';

  if (!$bugStore) {
    bugStore.setUser(null);
  }
</script>

<Start />
