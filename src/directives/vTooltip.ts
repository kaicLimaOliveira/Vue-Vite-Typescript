import { DirectiveBinding } from "vue";

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
  mounted(element: HTMLElement, binding: DirectiveBinding<string>) {
    const tooltipContent = binding.value;
    const modifiers = binding.modifiers;
    const position = getPositionFromModifiers(modifiers);
      
    const tooltipParent = document.createElement("div");
    tooltipParent.style.position = "relative";
    const tooltip = document.createElement("div");

    tooltip.textContent = tooltipContent;
    tooltip.className = applyTooltipClasses(position);
    tooltipParent.appendChild(tooltip);
    
    const mouseEnterHandler = () => tooltip.classList.add("fade-in");
    const mouseLeaveHandler = () => tooltip.classList.remove("fade-in");
    
    element.insertAdjacentElement("afterend", tooltipParent);
    element.addEventListener("mouseenter", mouseEnterHandler);
    element.addEventListener("mouseleave", mouseLeaveHandler);
    
    element.tooltipHandlers = {
      mouseEnterHandler,
      mouseLeaveHandler,
    };
  },
  unmounted(element: HTMLElement) {
    const { mouseEnterHandler, mouseLeaveHandler } = 
      element.tooltipHandlers as {
        mouseEnterHandler: () => void;
        mouseLeaveHandler: () => void;
      };

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


function applyTooltipClasses(position: string) {
  const defaultClasses = "tooltip";
  let classes = defaultClasses;

  switch (position) {
    case Position.Left:
      classes += " -left-32 top-1";
      break;
    case Position.Right:
      classes += " left-10 -top-4";
      break;
    case Position.Top:
      classes += " -top-8";
      break;
    default:
      classes += "";
  }

  return classes;
}