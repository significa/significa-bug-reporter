import { getTeams } from "$lib/linear";

export const load = async () => {
    const teams = await getTeams()
    return { teams };
};