interface SelectProps {
  options: {
    label: string;
    value: string;
  }[];
  modelValue: number;
}

interface SelectEmits {
  /**
   * Emitted when the value changes.
   * @param {number} value - New value.
   */
  
  (event: 'update:modelValue', value: number): void
}

export {
  SelectProps,
  SelectEmits,
}