import { DirectiveBinding } from "vue";

interface CustomInputElement extends HTMLInputElement {
  _formatInput?: (event: Event) => void;
}

type Args = {
  el: HTMLInputElement;
  binding: DirectiveBinding<string>;
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


const closure = (args: Args) => {
  const format = (event: Event) => {
    event.preventDefault();
    const inputElement = event.target as HTMLInputElement;
    const inputValue = inputElement.value.replace(/[^\d]/g, '');
    const maskedValue = applyMask(inputValue, args.binding.value);
    inputElement.value = maskedValue;

    requestAnimationFrame(() => {
      const eventInput = new Event('input', { bubbles: true });
      inputElement.dispatchEvent(eventInput);
    });
  }

  return format;
}


export default {
  beforeMount(el: CustomInputElement, binding: DirectiveBinding<string>) {
    const formatInput = closure({ el, binding });

    el.addEventListener('input', formatInput);
    el._formatInput = formatInput;
  },
  // updated(el: CustomInputElement, binding: DirectiveBinding<string>) {
  //   const formatInput = closure({ el, binding });
    
  //   el.addEventListener('input', formatInput);
  //   el._formatInput = formatInput;
  // },
  beforeUnmount(el: CustomInputElement) {
    if (el._formatInput) el.removeEventListener('input', el._formatInput);
  },
};
