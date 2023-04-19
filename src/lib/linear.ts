import { LinearClient } from '@linear/sdk';
import 'dotenv/config';

// Api key authentication
export const linearClient = new LinearClient({
  accessToken: process.env.LINEAR_OAUTH_ACCESS_TOKEN
});

export type Team = {
  name: string;
  id: string;
  key: string;
};

export const getTeams = async (): Promise<Team[] | null> => {
  try {
    const { nodes } = await linearClient.teams();

    if (nodes.length === 0) return null;
    const teams = nodes.map((node) => {
      return {
        name: node.name,
        id: node.id,
        key: node.key
      };
    });
    return teams;
  } catch (error) {
    return null;
  }
};
