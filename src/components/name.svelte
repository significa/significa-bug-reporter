<script>
    /**
     * @type {string}
     */
     export let user
    import {TextButton} from '@significa/svelte-ui'
    import Form from './form.svelte';
</script>
<div>
    <div class="p-4" style="background: #FFD324">
        <h2>Reporting as {user}</h2>
        <TextButton>Log out</TextButton>
    </div>
    <Form />
</div>