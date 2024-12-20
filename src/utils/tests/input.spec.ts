import { describe, it, expect, vi, beforeEach, Mock } from 'vitest';
import { throttle, debounce } from '../helpers/inputs';

describe('Utility Functions', () => {
  let callback: Mock;

  beforeEach(() => {
    callback = vi.fn(); // Cria uma função mock para os testes
  });

  describe('throttle', () => {
    it('should call the callback immediately and then wait for the specified delay', async () => {
      const throttled = throttle(callback, 100);

      throttled(1); // Primeira chamada deve ser imediata
      expect(callback).toHaveBeenCalledWith(1);
      expect(callback).toHaveBeenCalledTimes(1);

      throttled(2); // Segunda chamada deve ser ignorada
      expect(callback).toHaveBeenCalledTimes(1);

      await new Promise((resolve) => setTimeout(resolve, 150));
      throttled(3);
      expect(callback).toHaveBeenCalledWith(2);
      expect(callback).toHaveBeenCalledTimes(2); 
    });

    it('should call the callback with the last arguments after the wait time', async () => {
      const throttled = throttle(callback, 100);

      throttled(1);
      throttled(2); 
      throttled(3); 

      await new Promise((resolve) => setTimeout(resolve, 150));
      expect(callback).toHaveBeenCalledWith(3);
      expect(callback).toHaveBeenCalledTimes(2);
    });
  });

  describe('debounce', () => {
    it('should call the callback after the specified delay', async () => {
      const debounced = debounce(callback, 100);

      debounced(1);
      expect(callback).toHaveBeenCalledTimes(0);

      await new Promise((resolve) => setTimeout(resolve, 50));
      expect(callback).toHaveBeenCalledTimes(0);

      debounced(2);
      await new Promise((resolve) => setTimeout(resolve, 50));
      expect(callback).toHaveBeenCalledTimes(0);

      await new Promise((resolve) => setTimeout(resolve, 100));
      expect(callback).toHaveBeenCalledWith(2);
      expect(callback).toHaveBeenCalledTimes(1);
    });

    it('should call the callback only once after rapid calls', async () => {
      const debounced = debounce(callback, 100);

      debounced(1);
      debounced(2);
      debounced(3);

      await new Promise((resolve) => setTimeout(resolve, 150));
      expect(callback).toHaveBeenCalledWith(3);
      expect(callback).toHaveBeenCalledTimes(1);
    });
  });
});
