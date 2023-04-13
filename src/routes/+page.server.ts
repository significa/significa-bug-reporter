import { getTeams } from '$lib/linear';

export const load = async () => {
  try {
    const teams = await getTeams();
    return { teams };
  } catch (err) {
    console.log(err);
  }
};
