<script lang="ts">
  import { browser } from '$app/environment';
  import { goto } from '$app/navigation';
  import type { Team } from '$lib/linear';
  import { linearTeams } from '$lib/stores/linearTeams';

  export let data: Team;

  if (data.key) {
    linearTeams.updateSore(data);
    if (browser) {
      goto('/');
    }
  } else if (browser) {
    goto('/');
  }
</script>
