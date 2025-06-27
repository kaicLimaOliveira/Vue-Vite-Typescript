import { Directive, DirectiveBinding } from "vue";

type ModifierKey = "ctrl" | "alt" | "shift" | "meta";

const shortcutDirective: Directive<HTMLElement, () => void> = {
  mounted(el: HTMLElement, binding: DirectiveBinding<() => void>) {
    if (!binding.arg) {
      console.warn("v-shortcut: Use o formato 'ctrl+tecla' (ex: v-shortcut:ctrl+m)");
      return;
    }

    const [modifier, key] = binding.arg.split("+") as [ModifierKey, string];

    if (!["ctrl", "alt", "shift", "meta"].includes(modifier) || !key) {
      console.warn("v-shortcut: Modificador inválido. Use 'ctrl', 'alt', 'shift' ou 'meta'.");
      return;
    }

    const handleKeydown = (event: KeyboardEvent) => {
      const isModifierPressed =
        (modifier === "ctrl" && event.ctrlKey) ||
        (modifier === "alt" && event.altKey) ||
        (modifier === "shift" && event.shiftKey) ||
        (modifier === "meta" && event.metaKey); 

      if (isModifierPressed && event.key.toLowerCase() === key.toLowerCase()) {
        event.preventDefault();
        if (typeof binding.value === "function") {
          binding.value();
        }
      }
    };

    (el as any).__handleKeydown__ = handleKeydown;
    window.addEventListener("keydown", handleKeydown);
  },

  unmounted(el) {
    window.removeEventListener("keydown", (el as any).__handleKeydown__);
  },
};

export default shortcutDirective;
