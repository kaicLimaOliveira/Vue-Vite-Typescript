import { describe, it, expect, beforeEach } from 'vitest';
import { setActivePinia, createPinia } from 'pinia';
import { useNavbarStore } from '../navbarStore';


describe('Navbar Store', () => {
  beforeEach(() => {
    setActivePinia(createPinia());
  });


  it('should initialize enableNavbar as false', () => {
    const store = useNavbarStore();
    expect(store.enableNavbar).toBe(false);
  });

  it('should allow toggling enableNavbar state', () => {
    const store = useNavbarStore();
    store.enableNavbar = true;
    expect(store.enableNavbar).toBe(true);
  });
});
