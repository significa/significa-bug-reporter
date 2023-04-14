<script lang="ts">
  import { bugStore } from '$lib/store';

  import {
    Button,
    Input,
    FloatingSelect,
    Radio,
    Label,
    FileUpload,
    type FileUploadItem
  } from '@significa/svelte-ui';
  import { enhance, type SubmitFunction } from '$app/forms';

  let teams = $bugStore.teams;

  let files: FileUploadItem[] = [];
  let attachments = '';
  $: if (files.length > 0) {
    attachments = files
      .filter((f) => f.status === 'success')
      .map((f) => f.url)
      .join(',');
  } else {
    attachments = '';
  }

  let priorityType = 'low' || 'high' || 'medium' || 'critical';
  const priorities = [
    {
      name: 'Low',
      description:
        'A non-urgent bug, this bug does not affect core functionality of the product'
    },
    {
      name: 'Medium',
      description:
        'This bug affects functionality but on a non-core user journey.'
    },
    {
      name: 'High',
      description:
        'This bug is causing core-functionality problems but not breaking the product.'
    },
    {
      name: 'Critical',
      description: 'The product can not function with this bug.'
    }
  ];

  $: selectedType = 'bug';
  let error = false;

  // To prevent the page to update
  const onSubmit: SubmitFunction = (input) => {
    console.log(input);
  };
</script>

<form action="?/submitReport" method="POST" use:enhance={onSubmit}>
  {#if teams}
    <div class="mt-6">
      <Label htmlFor="team">Team</Label>
      <FloatingSelect label="Select a team" name="team" id="team">
        {#each teams as team}
          <option value={team.id}>
            {team.name}
          </option>
        {/each}
      </FloatingSelect>
    </div>
  {/if}

  <div class="mt-6">
    <Label htmlFor="type">Type</Label>
    <FloatingSelect
      label="Type"
      name="type"
      id="type"
      bind:value={selectedType}
    >
      <option value="bug">Bug</option>
      <option value="request">Request</option>
    </FloatingSelect>
  </div>

  <div class="mt-6">
    <Label htmlFor="title">Title</Label>
    <Input name="title" id="title" placeholder="Title" value="" />
  </div>

  <div class="mt-6">
    <Label htmlFor="description">Description</Label>
    <p>Try to be as descriptive as possible.</p>
    <Input
      as="textarea"
      name="description"
      id="description"
      placeholder="Description"
      value=""
    />
  </div>

  {#if selectedType == 'bug'}
    <div class="mt-6">
      <Label htmlFor="steps">Steps to reproduce</Label>
      <p>Detailed instructions on how to reproduce this issue</p>
      <Input
        as="textarea"
        name="steps"
        id="steps"
        placeholder="Describe the steps to reproduce"
        value=""
      />
    </div>

    <div class="mt-6">
      <Label htmlFor="technical">Technical Information</Label>
      <p>Your Operating System, Browser, Device, etc.</p>
      <Input
        as="textarea"
        name="technical"
        id="technical"
        placeholder="Add some technical Information"
        value=""
      />
    </div>
  {/if}

  <div class="mt-6">
    <Label>Attachments</Label>
    <p>Add attachment</p>
    <FileUpload
      multiple
      name="files"
      bind:files
      getSignedUrl={async (file) => {
        const res = await fetch(
          `/get-signed-url?${new URLSearchParams({
            name: file.name,
            type: file.type,
            size: file.size.toString()
          }).toString()}`
        );
        return res.text();
      }}
    />
    <input type="hidden" name="attachments" bind:value={attachments} />
  </div>

  <div class="mt-6 border p-2">
    <Label htmlFor="priority">Priority</Label>

    {#each priorities as priority}
      <div class="flex row items-center mt-3">
        <Radio
          id={priority.name}
          bind:group={priorityType}
          value={priority.name}
          name="priority"
        />
        <div class="ml-2">
          <Label class="font-bold">{priority.name}</Label>
          <p>{priority.description}</p>
        </div>
      </div>
    {/each}
  </div>

  {#if error}
    <p>Something went wrong. Please try again or contact us.</p>
  {/if}

  <Button class="mt-6" type="submit">Create ticket</Button>
</form>
