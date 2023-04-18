import { getTeams } from '$lib/linear';
import { error } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

export const GET: RequestHandler = async ({ url }) => {
  try {
    const key = url.searchParams.get('key');

    if (!key) throw new Error('Key not found');

    const teams = await getTeams();
    const filteredTeam = teams?.find((value) => value.key === key);

    if (!filteredTeam?.key) throw new Error('There is no team');

    return new Response(JSON.stringify(filteredTeam));
  } catch (err) {
    console.error('Could not find team', err);
    throw error(500, 'Could not find team');
  }
};
