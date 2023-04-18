import { browser } from '$app/environment';
import { writable } from 'svelte/store';
import type { Team } from './linear';

const getDefaultTeams = () => {
  if (browser) {
    const localStoreTeams = window.localStorage.getItem('linear-teams');

    // localStoreTeams ver se existe, JSON.PARSE(localStoreTeams) pode dar erro fazer try catch,
    // verificar se é array se for fazer um map e verificar a estrutura se existe id, name, key
    // zod ???

    if (localStoreTeams) {
      return JSON.parse(localStoreTeams);
    }
  }
  return [];
};

const createTheme = () => {
  const { subscribe, update } = writable<Team[]>(getDefaultTeams());

  return {
    subscribe,
    fetch: async (code: string) => {
      const res = await fetch(`/api/teams?key=${code}`);
      // verify if res returns error 404 or is ok 200
      const data = await res.json();
      console.log('data', data);
      update((value) => [...value, data]);
      console.log(res);
    }
  };
};

export const linearTeams = createTheme();

linearTeams.subscribe(($linearTeams) => {
  if (browser) {
    window.localStorage.setItem('linear-teams', JSON.stringify($linearTeams));
  }
});
