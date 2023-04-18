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
