import { browser } from '$app/environment';
import { writable } from 'svelte/store';

const themes = ['light', 'dark'];

type Theme = 'light' | 'dark';

const isTheme = (theme: string): theme is Theme => {
  return themes.includes(theme);
};

const getTheme = (): Theme => {
  if (browser) {
    const q = window.matchMedia('(prefers-color-scheme: dark)');
    const localStoreTheme = window.localStorage.getItem('theme');

    if (localStoreTheme && isTheme(localStoreTheme)) {
      return localStoreTheme;
    }
    if (q.matches) {
      return 'dark';
    }
  }
  return 'light';
};

const createTheme = () => {
  const { subscribe, update } = writable<Theme>(getTheme());

  return {
    subscribe,
    toogle: () => update((v) => (v === 'light' ? 'dark' : 'light'))
  };
};

export const theme = createTheme();

theme.subscribe(($theme) => {
  if (browser) {
    window.localStorage.setItem('theme', $theme);
    document.documentElement.setAttribute('data-theme', $theme);
  }
});
