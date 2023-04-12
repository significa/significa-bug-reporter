<script>
    import {Input, Button, TextButton} from '@significa/svelte-ui'
</script>
<div>
    <h2>Add Team</h2>
    <h4>Paste in the code provided and add a label so you can easily identify this team. This label is only for you.</h4>
    <h4>Code *</h4>
    <Input placeholder="Paste in code"/>
    <h4>Label *</h4>
    <Input placeholder="Label so you can identify this team"/>
    <div>
        <Button>Add team</Button>
        <TextButton>Cancel</TextButton>
    </div>
</div>