import { describe, it, vi, expect, beforeEach, afterEach } from 'vitest';
import { DirectiveBinding } from 'vue';
import tooltipDirective, { applyTooltipPosition, Position } from '../vTooltip'; 
import { calculatePosition } from '../vTooltip';

vi.mock('../../composables/useWindowSize', () => ({
  useWindowSize: vi.fn(() => ({
    width: { value: 500 },
    height: { value: 500 },
  })),
}));


describe('tooltipDirective', () => {
  let element: HTMLElement;
  let tooltip: HTMLElement;

  beforeEach(() => {
    element = document.createElement('div');
    tooltip = document.createElement('div');
    document.body.appendChild(element);
  });

  afterEach(() => {
    document.body.innerHTML = ''; 
  });

  describe('calculatePosition', () => {
    it('should calculate the position correctly to the right', () => {
      element.getBoundingClientRect = () => ({
        x: 100, 
        y: 100,
        toJSON: () => true,
        left: 100,
        top: 100,
        right: 400,
        bottom: 200,
        width: 50,
        height: 50,
      });

      const position = calculatePosition(element, tooltip);

      expect(position).toBe('right');
    });
  });

  describe('applyTooltipPosition', () => {
    it('should calculate the position correctly to the right', () => {
      const rect = { 
        left: 100, 
        top: 100, 
        right: 400, 
        bottom: 200, 
        width: 50, 
        height: 50,
        x: 50, 
        y: 50,
        toJSON: () => true,
      };

      tooltip.style.left = '';
      tooltip.style.top = '';
      tooltip.style.right = '';
      tooltip.style.bottom = '';

      element.getBoundingClientRect = () => rect;
      applyTooltipPosition(tooltip, element, Position.Right);

      expect(tooltip.style.left).toBe('410px');
      expect(tooltip.style.top).toBe('125px');
    });

    it('should calculate the position correctly to the left', () => {
      const rect = { 
        left: 400, 
        top: 100, 
        right: 450, 
        bottom: 200,
        width: 50, 
        height: 50,
        x: 100, 
        y: 100,
        toJSON: () => true,
      };

      tooltip.style.left = '';
      tooltip.style.top = '';
      tooltip.style.right = '';
      tooltip.style.bottom = '';

      element.getBoundingClientRect = () => rect;
      applyTooltipPosition(tooltip, element, Position.Left);

      expect(tooltip.style.left).toBe('390px');
      expect(tooltip.style.top).toBe('125px');
    });

    it('should calculate the position correctly to bottom', () => {
      const rect = { 
        left: 100, 
        top: 100, 
        right: 150, 
        bottom: 450, 
        width: 50,
        height: 50,
        x: 100, 
        y: 100,
        toJSON: () => true,
      };

      tooltip.style.left = '';
      tooltip.style.top = '';
      tooltip.style.right = '';
      tooltip.style.bottom = '';

      element.getBoundingClientRect = () => rect;
      applyTooltipPosition(tooltip, element, Position.Bottom);

      expect(tooltip.style.left).toBe('125px');
      expect(tooltip.style.top).toBe('460px');
    });

    it('should calculate the position correctly to top', () => {
      const rect = { 
        left: 100, 
        top: 100, 
        right: 150, 
        bottom: 200, 
        width: 50, 
        height: 50,
        x: 100, 
        y: 100,
        toJSON: () => true,
      };
      
      tooltip.style.left = '';
      tooltip.style.top = '';
      tooltip.style.right = '';
      tooltip.style.bottom = '';

      element.getBoundingClientRect = () => rect;
      applyTooltipPosition(tooltip, element, Position.Top);

      expect(tooltip.style.left).toBe('125px');
      expect(tooltip.style.top).toBe('90px');
    });
  });

  describe('mounted', () => {
    it('should add the tooltip to the DOM and associate the handlers with the element', () => {
      const binding = {
        value: 'Tooltip Content',
        modifiers: {
          top: true,  
        },
        instance: null,
        oldValue: null,
        dir: {}
      } as DirectiveBinding<string>;
  
      tooltipDirective.mounted(element, binding);
  
      expect(element.tooltipHandlers).toHaveProperty('showTooltip');
      expect(element.tooltipHandlers).toHaveProperty('hideTooltip');
      expect(element.tooltipHandlers?.tooltipElement).toBeDefined();
      expect(document.body.contains(element.tooltipHandlers?.tooltipElement!)).toBe(true);
    });
  });
  

  describe('unmounted', () => {
    it('should remove the tooltip and event listeners from the element', () => {
      const binding = {
        value: 'Tooltip Content',
        modifiers: {
          top: true,  
        },
        instance: null,
        oldValue: null,
        dir: {}
      } as DirectiveBinding<string>;

      tooltipDirective.mounted(element, binding);
      tooltipDirective.unmounted(element);

      expect(element.tooltipHandlers).toBeUndefined();
      expect(document.body.contains(element.tooltipHandlers?.tooltipElement!)).toBe(false);
    });
  });
});