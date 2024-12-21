import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import { createRouter, createWebHistory } from 'vue-router';
import NotFound from '../not-found.vue';

// Mock do roteador
const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', name: 'Home', component: { template: '<div>Home</div>' } },
    { path: '/not-found', name: 'NotFound', component: NotFound },
  ],
});

describe('NotFound.vue', () => {
  it('should correctly render the main elements', () => {
    const wrapper = mount(NotFound, {
      global: {
        plugins: [router],
      },
    });

    const img = wrapper.find('img');
    expect(img.exists()).toBeTruthy();
    expect(img.attributes('src')).toBe('/src/assets/imgs/notfound.svg');
    expect(img.attributes('alt')).toBe('Not found image');

    const span = wrapper.find('span');
    expect(span.exists()).toBeTruthy();
    expect(span.text()).toBe('Página não encontrada');

    const routerLink = wrapper.find('.router-link');
    expect(routerLink.exists()).toBeTruthy();
    expect(routerLink.text()).toBe('Voltar a página principal');
  });

  it('should redirect to the home page when clicking on the link', async () => {
    router.push('/not-found');
    await router.isReady();

    const wrapper = mount(NotFound, {
      global: {
        plugins: [router],
      },
    });

    const routerLink = wrapper.find('.router-link');
    
    await routerLink.trigger('click');
    await router.push('/');
    await router.isReady();

    expect(router.currentRoute.value.name).toBe('Home');
  });
});
