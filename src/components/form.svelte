<script lang="ts">
  import { bugStore } from '$lib/store';
  import { page } from '$app/stores';

  import {
    Button,
    Input,
    Radio,
    Label,
    Select,
    FileUpload,
    type FileUploadItem
  } from '@significa/svelte-ui';
  import { enhance, type SubmitFunction } from '$app/forms';
  import { linearTeams } from '$lib/linearTeams';

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

  $: selectedType = 'bug';

  let showTeamInput = false;

  // To prevent the page to update
  const onSubmit: SubmitFunction = (input) => {
    //console.log(input);
  };

  $: console.log($linearTeams);

  let key = '';
</script>

<form action="?/submitReport" method="POST" use:enhance={onSubmit}>
  <input type="hidden" name="author" bind:value={author} />
  {#if !!$linearTeams.length}
    <div class="mt-6">
      <Label htmlFor="team" class="font-medium text-base">Team</Label>
      <Select
        label="Select a team"
        name="teamId"
        id="team"
        error={!!$page.form?.error?.fields?.teamId}
      >
        {#each $linearTeams as team}
          <option value={team.id}>
            {team.name}
          </option>
        {/each}
      </Select>
    </div>
  {/if}

  {#if showTeamInput}
    <div class="mt-6">
      <Label htmlFor="technical" class="font-medium text-base">Add team</Label>
      <p class="text-sm/none text-foreground-secondary mb-2">
        Please provide the code of the team.
      </p>
      <Input
        as="input"
        name="addTeam"
        id="addTeam"
        placeholder="Add code of the team"
        bind:value={key}
      />
      <Button
        type="button"
        variant="secondary"
        class="mt-3"
        disabled={!key}
        on:click={() => linearTeams.fetch(key)}>Add</Button
      >
    </div>
  {/if}

  {#if !showTeamInput}
    <Button
      variant="secondary"
      class="mt-6"
      on:click={() => (showTeamInput = true)}>Add team</Button
    >
  {/if}

  <div class="mt-6">
    <Label htmlFor="type" class="font-medium text-base">Type</Label>
    <Select
      label="Type"
      name="type"
      id="type"
      bind:value={selectedType}
      error={!!$page.form?.error?.fields?.type}
    >
      <option value="bug">Bug</option>
      <option value="request">Request</option>
    </Select>
  </div>

  <div class="mt-6">
    <Label htmlFor="title" class="font-medium text-base">Title</Label>
    <Input
      name="title"
      id="title"
      placeholder="Title"
      value=""
      error={!!$page.form?.error?.fields?.title}
    />
  </div>

  <div class="mt-6">
    <Label htmlFor="description" class="text-foreground text-base font-medium"
      >Description</Label
    >
    <p class="text-sm/none text-foreground-secondary mb-2">
      Try to be as descriptive as possible.
    </p>
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
      <Label htmlFor="steps" class="text-foreground text-base font-medium"
        >Steps to reproduce</Label
      >
      <p class="text-sm/none text-foreground-secondary mb-2">
        Detailed instructions on how to reproduce this issue
      </p>
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
      <Label htmlFor="technical" class="text-foreground text-base font-medium"
        >Technical Information</Label
      >
      <p class="text-sm/none text-foreground-secondary mb-2">
        Your Operating System, Browser, Device, etc.
      </p>
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
    <Label for="attachements" class="text-foreground text-base font-medium"
      >Attachments</Label
    >
    <p class="text-sm/none text-foreground-secondary mb-2">Add attachment</p>
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
            <Label for={priority.name} class="font-bold"
              >{priority.name}
              <p class="font-normal text-sm">{priority.description}</p>
            </Label>
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
            <Label for={priority.name} class="font-bold"
              >{priority.name}
              <p class="font-normal text-sm">{priority.description}</p>
            </Label>
          </div>
        </div>
      {/each}
    {/if}
  </div>

  <Button class="mt-6" type="submit">Create ticket</Button>
</form>
