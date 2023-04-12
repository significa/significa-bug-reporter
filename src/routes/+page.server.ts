import { getTeams } from "$lib/linear";

export const load = async () => {
    try {
        return {teams : await getTeams()}
    } catch (err) {
        console.log(err)
    }
};