<script lang="ts">
  import { bugStore } from '$lib/store';
  import { page } from '$app/stores';
  import { goto } from '$app/navigation';

  import {
    Button,
    Input,
    FloatingSelect,
    Radio,
    Label,
    FileUpload,
    type FileUploadItem,
    toast
  } from '@significa/svelte-ui';
  import { enhance, type SubmitFunction } from '$app/forms';
  import { createEventDispatcher } from 'svelte';
  import { browser } from '$app/environment';

  let teams = $bugStore.teams;
  let author = $bugStore.userName;

  let files: FileUploadItem[] = [];
  let attachments = '';
  $: if (files.length > 0) {
    attachments = files
      .filter((f) => f.status === 'success')
      .map((f) => f.url)
      .join(', ');
  } else {
    attachments = '';
  }

  let priorityType = 'low' || 'high' || 'medium' || 'critical';
  const priorities = [
    {
      name: 'low',
      description:
        'A non-urgent bug, this bug does not affect core functionality of the product'
    },
    {
      name: 'medium',
      description:
        'This bug affects functionality but on a non-core user journey.'
    },
    {
      name: 'high',
      description:
        'This bug is causing core-functionality problems but not breaking the product.'
    },
    {
      name: 'critical',
      description: 'The product can not function with this bug.'
    }
  ];
  const prioritiesRequest = [
    {
      name: 'low',
      description: 'A non-urgent request, to be tackled whenever theres time.'
    },
    {
      name: 'medium',
      description: 'This request is important but on a non-core user journey.'
    },
    {
      name: 'high',
      description:
        'This is a core-functionality request that needs to be tackled as soon as possible.'
    },
    {
      name: 'critical',
      description: 'The product can not function without this.'
    }
  ];

  let loading = false;

  $: selectedType = 'bug';

  const dispatch = createEventDispatcher<{
    success: undefined;
    error: string;
  }>();

  $: if ($page.form?.success) {
    dispatch('success');
    toast.success({
      message: 'test',
      timeout: 8000
    });
    goto('/success');
  }
  $: if ($page.form?.error) {
    dispatch('error', $page.form.error.type);
    if (browser) {
      if ($page.form?.error?.type === 'notion') {
        toast.error({
          message: 'Something went wrong :(',
          description: 'Please try again!',
          timeout: 0
        });
      }
    }
  }
</script>

<form
  action="?/submitReport"
  method="POST"
  use:enhance={() => {
    loading = true;

    return async ({ update }) => {
      loading = false;
      files = [];

      await update();
    };
  }}
>
  <input type="hidden" name="author" bind:value={author} />
  {#if teams}
    <div class="mt-6">
      <Label htmlFor="team" required>Team</Label>
      <FloatingSelect
        label="Select a team"
        name="teamId"
        id="team"
        error={!!$page.form?.error?.fields?.teamId}
      >
        {#each teams as team}
          <option value={team.id}>
            {team.name}
          </option>
        {/each}
      </FloatingSelect>
    </div>
  {/if}

  <div class="mt-6">
    <Label htmlFor="type" required>Type</Label>
    <FloatingSelect
      error={!!$page.form?.error?.fields?.type}
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
    <Label htmlFor="title" required>Title</Label>
    <Input
      name="title"
      id="title"
      placeholder="Title"
      value=""
      error={!!$page.form?.error?.fields?.title}
    />
  </div>

  <div class="mt-6">
    <Label htmlFor="description" required>Description</Label>
    <p>Try to be as descriptive as possible.</p>
    <Input
      error={!!$page.form?.error?.fields?.description}
      as="textarea"
      name="description"
      id="description"
      placeholder="Description"
      value=""
    />
  </div>

  {#if selectedType == 'bug'}
    <div class="mt-6">
      <Label htmlFor="steps" required>Steps to reproduce</Label>
      <p>Detailed instructions on how to reproduce this issue</p>
      <Input
        error={!!$page.form?.error?.fields?.steps}
        as="textarea"
        name="steps"
        id="steps"
        placeholder="Describe the steps to reproduce"
        value=""
      />
    </div>

    <div class="mt-6">
      <Label htmlFor="technical" required>Technical Information</Label>
      <p>Your Operating System, Browser, Device, etc.</p>
      <Input
        error={!!$page.form?.error?.fields?.technical}
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
    <Label htmlFor="priority" required>Priority</Label>
    {#if selectedType == 'bug'}
      {#each priorities as priority}
        <div class="flex row items-center mt-3">
          <Radio
            error={!!$page.form?.error?.fields?.priority}
            id={priority.name}
            bind:group={priorityType}
            value={priority.name}
            name="priority"
          />
          <div class="ml-2">
            <Label class="font-bold">{priority.name.toUpperCase()}</Label>
            <p>{priority.description}</p>
          </div>
        </div>
      {/each}
    {/if}
    {#if selectedType == 'request'}
      {#each prioritiesRequest as priority}
        <div class="flex row items-center mt-3">
          <Radio
            error={!!$page.form?.error?.fields?.priority}
            id={priority.name}
            bind:group={priorityType}
            value={priority.name}
            name="priority"
          />
          <div class="ml-2">
            <Label class="font-bold">{priority.name.toUpperCase()}</Label>
            <p>{priority.description}</p>
          </div>
        </div>
      {/each}
    {/if}
  </div>

  <Button {loading} class="mt-6" type="submit">Create ticket</Button>
</form>
