import { VNode } from "vue";

interface InputProps {
  id?: string;
  label?: string;
  helpText?: string;
  modelValue?: string;
  mask?: string; 
  icon?: string;
}

interface InputEmits {
  /**
   * Emitted when the value changes.
   * @param {string} value - New value.
   */
  
  (event: 'update:modelValue', value: string): void
}

interface InputSlots {
  /**
  * Custom content such as icons, images and text can be placed inside the button via the default slot. Note that when slot is used, label, icon and badge properties are not included.
  */
  default(): VNode[];
  /**
  * Custom icon template.
  * @param {Object} scope - icon slot's params.
  */
}

export type {
  InputProps,
  InputEmits,
  InputSlots
}
