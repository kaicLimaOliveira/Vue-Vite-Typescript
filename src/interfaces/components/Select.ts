/**
 * Props for the Select component.
 */
interface SelectProps {
  /**
   * **options**:  
   * An array of options to display in the select dropdown. Each option must include a `label` for display purposes and a `value` to represent the option's data.
   *
   * @example
   * options: [
   *   { label: "Option 1", value: "1" },
   *   { label: "Option 2", value: "2" }
   * ]
   */
  options: {
    label: string;
    value: number;
  }[];

  /**
   * **modelValue**:  
   * The currently selected value in the dropdown.  
   * This is a two-way bound property using `v-model`.
   * 
   * @example
   * <Select v-model="selectedValue" :options="options" />
   *
   * @default undefined
   */
  modelValue: number;
}

export {
  SelectProps,
}