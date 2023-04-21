import { getTeams } from '$lib/linear';
import { error } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

export const GET: RequestHandler = async ({ url }) => {
  const key = url.searchParams.get('key');

  if (!key) throw error(400, 'Key not found');

  const teams = await getTeams();
  const filteredTeam = teams?.find((value) => value.key === key);

  if (!filteredTeam?.key) throw error(404, 'Could not find team');

  return new Response(JSON.stringify(filteredTeam));
};
