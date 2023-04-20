import { handleContactForm } from '$lib/forms';
import { getTeams, linearClient } from '$lib/linear';
import { priorityType } from '$lib/types';
import type { Actions } from '@sveltejs/kit';

import 'dotenv/config';

export const load = async () => {
  try {
    const teams = await getTeams();
    return { teams };
  } catch (err) {
    console.log(err);
  }
};

export const actions: Actions = {
  submitReport: handleContactForm(
    async ({
      description,
      title,
      teamId,
      author,
      priority,
      attachments,
      type,
      steps,
      technical
    }) => {
      const getPriorityLabel = (priority: `${priorityType}` | string) => {
        if (priority === priorityType.Medium) {
          return '🟡  **Medium**';
        }
        if (priority === priorityType.High) {
          return '🟠  **High**';
        }
        if (priority === priorityType.Critical) {
          return '🔴  **Critical**';
        }
        return '🟢  **Low**';
      };

      let payload = `## Description\n___ \n${description}`;

      if (type === 'bug') {
        payload +=
          '&nbsp;  \n' +
          '&nbsp;  \n' +
          '## Steps to reproduce\n' +
          '___ \n' +
          steps +
          '&nbsp;  \n' +
          '&nbsp;  \n' +
          '## Technical Information\n' +
          '___ \n' +
          technical;
      }

      payload +=
        '&nbsp;  \n' +
        '&nbsp;  \n' +
        attachments +
        '&nbsp;  \n' +
        `${getPriorityLabel(priority)} priority ${type} reported by ${author}`;

      await linearClient.createIssue({
        teamId,
        title: `[${type}] ${title}`,
        description: payload
      });
    }
  )
};
