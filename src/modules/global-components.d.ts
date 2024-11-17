import { FontAwesomeIconProps } from '@fortawesome/vue-fontawesome';
import { ButtonProps, ModalProps } from '../interfaces/Components'
import { InputProps, InputEmits, InputSlots } from '../interfaces/components/Input'
import { SelectEmits, SelectProps } from '../interfaces/components/Select';

declare module '@vue/runtime-core' {
  export interface GlobalComponents {
    Input: DefineComponent<InputProps, InputEmits, InputSlots>,
    Button: DefineComponent<ButtonProps>,
    Icon: DefineComponent<FontAwesomeIconProps>,
    Modal: DefineComponent<ModalProps>,
    Select: DefineComponent<SelectProps, SelectEmits>,
  }
}