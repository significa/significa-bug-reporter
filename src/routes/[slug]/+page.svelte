<script lang="ts">
  import { browser } from '$app/environment';
  import { goto } from '$app/navigation';
  import type { Team } from '$lib/linear';
  import { linearTeams } from '$lib/stores/linearTeams';
  import { toast } from '@significa/svelte-ui';
  import { onMount } from 'svelte';

  export let data: Team;

  onMount(() => {
    if (data.key) {
      linearTeams.updateSore(data);
      toast.success({
        message: 'Team successfully migrated.'
      });
      goto('/');
    } else {
      toast.error({
        message: 'Server Error',
        description: 'Could not find the team, please try again.',
        timeout: 0
      });
      goto('/');
    }
  });
</script>
