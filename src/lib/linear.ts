import { LinearClient } from '@linear/sdk';
import 'dotenv/config';

// Api key authentication
export const linearClient = new LinearClient({
  accessToken: process.env.LINEAR_OAUTH_ACCESS_TOKEN
});

export const getTeams = async (): Promise<
  | {
      name: string;
      id: string;
    }[]
  | null
> => {
  try {
    const { nodes } = await linearClient.teams();

    if (nodes.length === 0) return null;
    const teams = nodes.map((node) => {
      return {
        name: node.name,
        id: node.id
      };
    });
    return teams;
  } catch (error) {
    return null;
  }
};

type Args =
  | {
      type: 'bug';
      author: string;
      teamId: string;
      title: string;
      description: string;
      steps: string;
      technical: string;
      priority: string;
      attachments: string[];
    }
  | {
      type: 'request';
      author: string;
      teamId: string;
      title: string;
      description: string;
      priority: string;
      attachments: string[];
    };

export const createIssue = async (args: Args): Promise<void> => {
  const { type, author, teamId, title, description, priority, attachments } =
    args;

  const priorityLabel: Record<string, string> = {
    low: '🟢  **Low**',
    medium: '🟡  **Medium**',
    high: '🟠  **High**',
    critical: '🔴  **Critical**'
  };

  let payload = `## Description\n___ \n${description}`;

  if (type === 'bug') {
    const { steps, technical } = args;

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

  const { success } = await linearClient.createIssue({
    teamId,
    title: `[${type}] ${title}`,
    description: payload
  });

  if (!success) {
    throw new Error("Couldn't create issue");
  }
};
