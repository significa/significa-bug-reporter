import { browser } from '$app/environment';
import { writable } from 'svelte/store';

const themes = ['light', 'dark'];

type Theme = 'light' | 'dark';

const isTheme = (theme: string): theme is Theme => {
  return themes.includes(theme);
};

const getFromLocalStorage = (): Theme => {
  if (browser) {
    const theme = window.localStorage.getItem('theme');

    if (theme && isTheme(theme)) {
      return theme;
    }
  }
  return 'light';
};

const createTheme = () => {
  const { subscribe, update } = writable<Theme>(getFromLocalStorage());

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