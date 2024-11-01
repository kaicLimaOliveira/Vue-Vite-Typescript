import { describe, it, expect, beforeEach } from 'vitest';
import { setActivePinia, createPinia } from 'pinia';
import { useLoadingStore } from '../loadingStore';

describe('Loading Store', () => {
  beforeEach(() => {
    setActivePinia(createPinia());
  });

  it('should start with is loading as false', () => {
    const loadingStore = useLoadingStore();
    expect(loadingStore.isLoading).toBeFalsy();
  });

  it('should change is loading to true because of the getter', () => {
    const loadingStore = useLoadingStore();
    loadingStore.loading;
    expect(loadingStore.isLoading).toBeTruthy();
  });
});
