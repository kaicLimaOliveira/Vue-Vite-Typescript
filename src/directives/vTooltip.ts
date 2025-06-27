import { DirectiveBinding } from "vue";
import { useWindowSize } from "../composables/useWindowSize";
import '../assets/styles/scss/tooltip.scss'

const { width, height } = useWindowSize();
const TOOLTIP_MARGIN = 10;

export enum Position {
  Left = "left",
  Right = "right",
  Top = "top",
  Bottom = "bottom",
}

declare global {
  interface HTMLElement {
    tooltipHandlers?: {
      showTooltip: () => void;
      hideTooltip: () => void;
      tooltipElement?: HTMLElement;
    };
  }
}

export function calculatePosition(element: HTMLElement, tooltip: HTMLElement): Position {
  const rect = element.getBoundingClientRect();

  const hasSpaceLeft = rect.left >= tooltip.offsetWidth + TOOLTIP_MARGIN;
  const hasSpaceRight = width.value - rect.right >= tooltip.offsetWidth + TOOLTIP_MARGIN;
  const hasSpaceBottom = height.value - rect.bottom >= tooltip.offsetHeight + TOOLTIP_MARGIN;

  if (hasSpaceRight) return Position.Right;
  if (hasSpaceLeft) return Position.Left;
  if (hasSpaceBottom) return Position.Bottom;
  return Position.Top;
}

export function applyTooltipPosition(tooltip: HTMLElement, element: HTMLElement, position: Position) {
  const rect = element.getBoundingClientRect();

  tooltip.style.left = tooltip.style.top = tooltip.style.right = tooltip.style.bottom = "";

  switch (position) {
    case Position.Left:
      tooltip.style.left = `${rect.left - tooltip.offsetWidth - TOOLTIP_MARGIN}px`;
      tooltip.style.top = `${rect.top + rect.height / 2 - tooltip.offsetHeight / 2}px`;
      break;
    case Position.Right:
      tooltip.style.left = `${rect.right + TOOLTIP_MARGIN}px`;
      tooltip.style.top = `${rect.top + rect.height / 2 - tooltip.offsetHeight / 2}px`;
      break;
    case Position.Top:
      tooltip.style.left = `${rect.left + rect.width / 2 - tooltip.offsetWidth / 2}px`;
      tooltip.style.top = `${rect.top - tooltip.offsetHeight - TOOLTIP_MARGIN}px`;
      break;
    case Position.Bottom:
      tooltip.style.left = `${rect.left + rect.width / 2 - tooltip.offsetWidth / 2}px`;
      tooltip.style.top = `${rect.bottom + TOOLTIP_MARGIN}px`;
      break;
  }
}

export default {
  mounted(element: HTMLElement, binding: DirectiveBinding<string>) {
    const tooltip = document.createElement("div");
    tooltip.textContent = binding.value;
    tooltip.className = "tooltip";
    tooltip.style.position = "absolute";
    tooltip.style.visibility = "hidden";
    tooltip.style.pointerEvents = "none";

    document.body.appendChild(tooltip);

    let preferredPosition: Position | null = null;
    if (binding.modifiers.top) preferredPosition = Position.Top;
    else if (binding.modifiers.bottom) preferredPosition = Position.Bottom;
    else if (binding.modifiers.left) preferredPosition = Position.Left;
    else if (binding.modifiers.right) preferredPosition = Position.Right;
    
    const showTooltip = () => {
      tooltip.style.visibility = "visible";
      const position = preferredPosition ?? calculatePosition(element, tooltip);
      applyTooltipPosition(tooltip, element, position);
      tooltip.classList.add("fade-in");
    };

    const hideTooltip = () => {
      tooltip.style.visibility = "hidden";
      tooltip.classList.remove("fade-in");
    };

    element.addEventListener("mouseenter", showTooltip);
    element.addEventListener("mouseleave", hideTooltip);

    element.tooltipHandlers = { showTooltip, hideTooltip, tooltipElement: tooltip };
  },

  updated(element: HTMLElement, binding: DirectiveBinding<string>) {
    if (!binding.value && element.tooltipHandlers?.tooltipElement) {
      element.tooltipHandlers.tooltipElement.style.display = "none";
      return;
    }
    
    if (element.tooltipHandlers?.tooltipElement) {
      element.tooltipHandlers.tooltipElement.style.display = "block";
      element.tooltipHandlers.tooltipElement.textContent = binding.value;
    }
  },

  unmounted(element: HTMLElement) {
    const { showTooltip, hideTooltip, tooltipElement } = element.tooltipHandlers || {};

    if (showTooltip && hideTooltip) {
      element.removeEventListener("mouseenter", showTooltip);
      element.removeEventListener("mouseleave", hideTooltip);
    }

    if (tooltipElement && tooltipElement.parentNode) {
      tooltipElement.parentNode.removeChild(tooltipElement);
    }

    delete element.tooltipHandlers;
  },
};
