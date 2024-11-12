import { FontAwesomeIconProps } from '@fortawesome/vue-fontawesome';
import { ButtonProps, InputProps } from '../interfaces/Components'

declare module '@vue/runtime-core' {
  export interface GlobalComponents {
    Input: DefineComponent<InputProps>,
    Button: DefineComponent<ButtonProps>,
    Icon: DefineComponent<FontAwesomeIconProps>,
  }
}