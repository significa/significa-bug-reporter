<script lang="ts">
  import { goto } from '$app/navigation';
  import { linearTeams } from '$lib/stores/linearTeams';
  import type { Team } from '$lib/zodSchema';
  import { Link, toast } from '@significa/svelte-ui';
  import { onMount } from 'svelte';

  import '$styles/index.css';

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

<p class="font-bold">Please stand by, you will be redirected soon ...</p>
<Link href="/">If you were not redirected please click here.</Link>
