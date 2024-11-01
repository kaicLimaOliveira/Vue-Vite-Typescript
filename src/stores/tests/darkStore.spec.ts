import { describe, it, expect, beforeEach } from 'vitest';
import { shallowMount } from '@vue/test-utils'

import { setActivePinia, createPinia } from 'pinia';
import router from '../../router/routes';

import { useDarkModeStore } from '../darkStore';
import App from '../../App.vue';

describe('Dark Store', () => {
  beforeEach(() => {
    setActivePinia(createPinia());
  });

  it('should state value isDarkModeOn to be false', () => {
    const darkStore = useDarkModeStore();
    expect(darkStore.isDarkModeOn).toBeFalsy();
  });

  it('should toggle the value isDarkModeOn to be true', () => {
    const darkStore = useDarkModeStore();
    darkStore.toggleDarkMode()
    expect(darkStore.isDarkModeOn).toBeTruthy();
  });

  it('should has a dark theme class in html', async () => {
    const app = await shallowMount(App, {
      global: {
        plugins: [router]
      }
    })

    expect(app.classes()).contains('dark-theme')
  })
});
