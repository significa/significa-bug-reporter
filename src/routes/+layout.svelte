<script lang="ts">
  import { toast, Toaster, ToastNotification } from '@significa/svelte-ui';
  import { beforeNavigate } from '$app/navigation';

  beforeNavigate(() => {
    toast.clearAll();
  });
</script>

<Toaster component={ToastNotification} />
<slot />
