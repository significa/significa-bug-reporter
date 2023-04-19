import { handleContactForm } from '$lib/forms';
import { linearClient } from '$lib/linear';
import type { Actions } from '@sveltejs/kit';

import 'dotenv/config';

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
      const priorityLabel: Record<string, string> = {
        low: '🟢  **Low**',
        medium: '🟡  **Medium**',
        high: '🟠  **High**',
        critical: '🔴  **Critical**'
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
        `${priorityLabel[priority]} priority ${type} reported by ${author}`;

      await linearClient.createIssue({
        teamId,
        title: `[${type}] ${title}`,
        description: payload
      });
    }
  )
};
