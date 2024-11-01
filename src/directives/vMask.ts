import { DirectiveBinding } from "vue";

interface CustomInputElement extends HTMLInputElement {
  _formatInput?: (event: Event) => void;
}

function applyMask(value: string, pattern: string): string {
  let maskedValue = '';
  let valueIndex = 0;

  for (const char of pattern) {
    if (char === '#') {
      if (valueIndex < value.length) {
        maskedValue += value[valueIndex];
        valueIndex++;
      } else {
        break; 
      }
    } else {
      if (valueIndex >= value.length) {
        break;
      }
      maskedValue += char; 
    }
  }

  return maskedValue;
}

export default {
  beforeMount(el: CustomInputElement, binding: DirectiveBinding<string>) {
    const formatInput = (event: Event) => {
      const inputElement = event.target as HTMLInputElement;
      const inputValue = inputElement.value.replace(/[^\d]/g, '');
      const maskedValue = applyMask(inputValue, binding.value);
      inputElement.value = maskedValue;
    };

    el.addEventListener('input', formatInput);
    el._formatInput = formatInput;
  },
  beforeUnmount(el: CustomInputElement) {
    if (el._formatInput) el.removeEventListener('input', el._formatInput);
  },
};
