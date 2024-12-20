import { DirectiveBinding } from "vue";
import { useWindowSize } from "../composables/useWindowSize";
import { TooltipModifiers } from "../interfaces/Directives";

const { width, height } = useWindowSize();
const TOOLTIP_MARGIN = 10;

enum Position {
  Left = "left",
  Right = "right",
  Top = "top",
  Bottom = "bottom",
}

declare global {
  interface HTMLElement {
    tooltipHandlers?: {
      mouseEnterHandler: () => void;
      mouseLeaveHandler: () => void;
    };
  }
}

export default {
  mounted(element: HTMLElement, binding: DirectiveBinding<string> & { modifiers: TooltipModifiers }) {
    const tooltipContent = binding.value;
    const modifiers = binding.modifiers;
    const positionByModifier = getPositionFromModifiers(modifiers);

    const tooltipParent = document.createElement("div");
    tooltipParent.style.position = "relative";

    const tooltip = document.createElement("div");
    tooltip.textContent = tooltipContent;
    tooltip.className = "tooltip";
    tooltip.style.position = "absolute";
    tooltipParent.appendChild(tooltip);

    element.insertAdjacentElement("afterend", tooltipParent);

    const mouseEnterHandler = () => {
      const position = positionByModifier || calculatePosition(element, tooltip);
      applyTooltipPosition(tooltip, element, position);
      tooltip.classList.add("fade-in");
    };

    const mouseLeaveHandler = () => {
      tooltip.classList.remove("fade-in");
    };

    element.addEventListener("mouseenter", mouseEnterHandler);
    element.addEventListener("mouseleave", mouseLeaveHandler);
    
    element.tooltipHandlers = {
      mouseEnterHandler,
      mouseLeaveHandler,
    };
  },
  unmounted(element: HTMLElement) {
    const { mouseEnterHandler, mouseLeaveHandler } = element.tooltipHandlers || {};
    if (mouseEnterHandler && mouseLeaveHandler) {
      element.removeEventListener("mouseenter", mouseEnterHandler);
      element.removeEventListener("mouseleave", mouseLeaveHandler);
    }
    delete element.tooltipHandlers;
  },
};

function getPositionFromModifiers(modifiers: Record<string, boolean>) {
  if (modifiers.left) return Position.Left;
  if (modifiers.top) return Position.Top;
  if (modifiers.bottom) return Position.Bottom;
  return Position.Right;
}

function calculatePosition(element: HTMLElement, tooltip: HTMLElement): Position {
  const rect = element.getBoundingClientRect();

  const hasSpaceLeft = rect.left >= tooltip.offsetWidth + TOOLTIP_MARGIN;
  const hasSpaceRight = width.value - rect.right >= tooltip.offsetWidth + TOOLTIP_MARGIN;
  const hasSpaceBottom = height.value - rect.bottom >= tooltip.offsetHeight + TOOLTIP_MARGIN;

  if (hasSpaceRight) return Position.Right;
  if (hasSpaceLeft) return Position.Left;
  if (hasSpaceBottom) return Position.Bottom;
  return Position.Top;
}

function applyTooltipPosition(tooltip: HTMLElement, element: HTMLElement, position: Position) {
  const targetRect = element.getBoundingClientRect();
  tooltip.style.left = tooltip.style.top = tooltip.style.right = tooltip.style.bottom = "";
  const tooltipRect = tooltip.getBoundingClientRect()
  
  switch (position) {
    case Position.Left:
      tooltip.style.transform = 'translateX(-240%)';
      tooltip.style.top = `23px`;
      break;
    case Position.Right:
      tooltip.style.transform = 'translateX(200%)';
      tooltip.style.bottom = `20px`;
      break;
    case Position.Top:
      tooltip.style.top = `${targetRect.top - tooltipRect.height - 8}px`;
      tooltip.style.left = `${targetRect.left + targetRect.width / 2 - tooltipRect.width / 22}px`;
      break;
    case Position.Bottom:
      tooltip.style.top = `${targetRect.bottom + 8}px`;
      tooltip.style.left = `${targetRect.left + targetRect.width / 2 - tooltipRect.width / 2}px`;
      break;
  }
}
