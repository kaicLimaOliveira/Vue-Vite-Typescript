import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { DirectiveBinding, ObjectDirective } from 'vue';
import shortcutDirective from '../vShortcut';

type TestDirective = ObjectDirective<HTMLElement, () => void> & {
  mounted?: (el: HTMLElement, binding: DirectiveBinding<() => void>) => void;
  unmounted?: (el: HTMLElement) => void;
};

declare global {
  interface HTMLElement {
    __handleKeydown__?: (event: KeyboardEvent) => void;
  }
}

describe('shortcutDirective', () => {
  let element: HTMLElement;
  let binding: Partial<DirectiveBinding<() => void>>;
  let mockCallback: ReturnType<typeof vi.fn>;
  let addEventListenerSpy: ReturnType<typeof vi.spyOn>;
  let removeEventListenerSpy: ReturnType<typeof vi.spyOn>;
  let consoleWarnSpy: ReturnType<typeof vi.spyOn>;

  beforeEach(() => {
    element = document.createElement('div');
    mockCallback = vi.fn();
    binding = {
      value: mockCallback,
      arg: 'ctrl+s'
    };

    addEventListenerSpy = vi.spyOn(window, 'addEventListener');
    removeEventListenerSpy = vi.spyOn(window, 'removeEventListener');
    consoleWarnSpy = vi.spyOn(console, 'warn').mockImplementation(() => {});
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  describe('mounted', () => {
    it('should register keydown event listener when mounted', () => {
      (shortcutDirective as TestDirective).mounted!(element, binding as DirectiveBinding<() => void>);
      
      expect(addEventListenerSpy).toHaveBeenCalledWith('keydown', expect.any(Function));
      expect((element as any).__handleKeydown__).toBeDefined();
    });

    it('should warn and not register listener when arg is missing', () => {
      binding.arg = undefined;
      
      (shortcutDirective as TestDirective).mounted!(element, binding as DirectiveBinding<() => void>);
      
      expect(consoleWarnSpy).toHaveBeenCalledWith(
        "v-shortcut: Use o formato 'ctrl+tecla' (ex: v-shortcut:ctrl+m)"
      );
      expect(addEventListenerSpy).not.toHaveBeenCalled();
    });

    it('should warn and not register listener when modifier is invalid', () => {
      binding.arg = 'invalid+s';
      
      (shortcutDirective as TestDirective).mounted!(element, binding as DirectiveBinding<() => void>);
      
      expect(consoleWarnSpy).toHaveBeenCalledWith(
        "v-shortcut: Modificador inválido. Use 'ctrl', 'alt', 'shift' ou 'meta'."
      );
      expect(addEventListenerSpy).not.toHaveBeenCalled();
    });

    it('should warn and not register listener when key is missing', () => {
      binding.arg = 'ctrl+';
      
      (shortcutDirective as TestDirective).mounted!(element, binding as DirectiveBinding<() => void>);
      
      expect(consoleWarnSpy).toHaveBeenCalledWith(
        "v-shortcut: Modificador inválido. Use 'ctrl', 'alt', 'shift' ou 'meta'."
      );
      expect(addEventListenerSpy).not.toHaveBeenCalled();
    });
  });

  describe('unmounted', () => {
    it('should remove keydown event listener when unmounted', () => {
      (shortcutDirective as TestDirective).mounted!(element, binding as DirectiveBinding<() => void>);
      (shortcutDirective as TestDirective).unmounted!(element);
      
      expect(removeEventListenerSpy).toHaveBeenCalledWith('keydown', (element as any).__handleKeydown__);
    });
  });

  describe('keydown handler', () => {
    it('should call the callback when the correct key combination is pressed', () => {
      (shortcutDirective as TestDirective).mounted!(element, binding as DirectiveBinding<() => void>);
      
      const keydownHandler = (element as any).__handleKeydown__;
      const event = {
        key: 's',
        ctrlKey: true,
        altKey: false,
        shiftKey: false,
        metaKey: false,
        preventDefault: vi.fn()
      } as unknown as KeyboardEvent;
      
      keydownHandler(event);
      
      expect(mockCallback).toHaveBeenCalledTimes(1);
      expect(event.preventDefault).toHaveBeenCalled();
    });

    it('should not call the callback when different key is pressed', () => {
      binding.arg = 'ctrl+s';
      (shortcutDirective as TestDirective).mounted!(element, binding as DirectiveBinding<() => void>);
      
      const keydownHandler = (element as any).__handleKeydown__;
      const event = {
        key: 'a',
        ctrlKey: true,
        altKey: false,
        shiftKey: false,
        metaKey: false,
        preventDefault: vi.fn()
      } as unknown as KeyboardEvent;
      
      keydownHandler(event);
      
      expect(mockCallback).not.toHaveBeenCalled();
      expect(event.preventDefault).not.toHaveBeenCalled();
    });

    it('should not call the callback when modifier is not pressed', () => {
      binding.arg = 'ctrl+s';
      (shortcutDirective as TestDirective).mounted!(element, binding as DirectiveBinding<() => void>);
      
      const keydownHandler = (element as any).__handleKeydown__;
      const event = {
        key: 's',
        ctrlKey: false,
        altKey: false,
        shiftKey: false,
        metaKey: false,
        preventDefault: vi.fn()
      } as unknown as KeyboardEvent;
      
      keydownHandler(event);
      
      expect(mockCallback).not.toHaveBeenCalled();
      expect(event.preventDefault).not.toHaveBeenCalled();
    });

    it('should work with alt modifier', () => {
      binding.arg = 'alt+s';
      (shortcutDirective as TestDirective).mounted!(element, binding as DirectiveBinding<() => void>);
      
      const keydownHandler = (element as any).__handleKeydown__;
      const event = {
        key: 's',
        ctrlKey: false,
        altKey: true,
        shiftKey: false,
        metaKey: false,
        preventDefault: vi.fn()
      } as unknown as KeyboardEvent;
      
      keydownHandler(event);
      
      expect(mockCallback).toHaveBeenCalledTimes(1);
    });

    it('should work with shift modifier', () => {
      binding.arg = 'shift+s';
      (shortcutDirective as TestDirective).mounted!(element, binding as DirectiveBinding<() => void>);
      
      const keydownHandler = (element as any).__handleKeydown__;
      const event = {
        key: 's',
        ctrlKey: false,
        altKey: false,
        shiftKey: true,
        metaKey: false,
        preventDefault: vi.fn()
      } as unknown as KeyboardEvent;
      
      keydownHandler(event);
      
      expect(mockCallback).toHaveBeenCalledTimes(1);
    });

    it('should work with meta modifier', () => {
      binding.arg = 'meta+s';
      (shortcutDirective as TestDirective).mounted!(element, binding as DirectiveBinding<() => void>);
      
      const keydownHandler = (element as any).__handleKeydown__;
      const event = {
        key: 's',
        ctrlKey: false,
        altKey: false,
        shiftKey: false,
        metaKey: true,
        preventDefault: vi.fn()
      } as unknown as KeyboardEvent;
      
      keydownHandler(event);
      
      expect(mockCallback).toHaveBeenCalledTimes(1);
    });

    it('should be case insensitive for key matching', () => {
      binding.arg = 'ctrl+s';
      (shortcutDirective as TestDirective).mounted!(element, binding as DirectiveBinding<() => void>);
      
      const keydownHandler = (element as any).__handleKeydown__;
      const event = {
        key: 'S', 
        ctrlKey: true,
        altKey: false,
        shiftKey: false,
        metaKey: false,
        preventDefault: vi.fn()
      } as unknown as KeyboardEvent;
      
      keydownHandler(event);
      
      expect(mockCallback).toHaveBeenCalledTimes(1);
    });

    it('should not call the callback if binding value is not a function', () => {
      binding.value = 'not a function' as any;
      (shortcutDirective as TestDirective).mounted!(element, binding as DirectiveBinding<() => void>);
      
      const keydownHandler = (element as any).__handleKeydown__;
      const event = {
        key: 's',
        ctrlKey: true,
        altKey: false,
        shiftKey: false,
        metaKey: false,
        preventDefault: vi.fn()
      } as unknown as KeyboardEvent;
      
      keydownHandler(event);
      
      expect(event.preventDefault).toHaveBeenCalled();
    });
  });
});
