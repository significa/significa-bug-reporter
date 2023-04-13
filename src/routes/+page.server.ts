import { getTeams } from '$lib/linear';
import { bug } from '../lib/store';

export const load = async () => {
  try {
    const teams = await getTeams();
    if(teams) {
        bug.setTeams(teams)
    }
  } catch (err) {
    console.log(err);
  }
};