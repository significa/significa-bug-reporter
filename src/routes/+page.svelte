<script lang="ts">
  import '$styles/index.css';
  import Start from '$components/start.svelte';
  export let data: any;
  import { bugStore } from '$lib/store';
  if (data) {
    bugStore.setTeams(data.teams);
  }
</script>

<div class="container px-container @container px-8 max-w-2xl mx-auto">
  <Start />
</div>
