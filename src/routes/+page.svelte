<script lang="ts">
  import '$styles/index.css';
  import Start from '$components/start.svelte';
  export let data: any;
  import { bug } from '$lib/store';
  if (data) {
    bug.setTeams(data.teams);
  }
</script>

<div class="p-10">
  <Start />
</div>
