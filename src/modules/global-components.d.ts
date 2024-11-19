import { ClassComponent, GlobalComponentConstructor } from './helpers';

import { FontAwesomeIconProps } from '@fortawesome/vue-fontawesome';
import { InputProps, InputEmits, InputSlots } from '../interfaces/components/Input'
import { SelectEmits, SelectProps } from '../interfaces/components/Select';
import { ButtonProps, ButtonEmits, ButtonSlots } from '../interfaces/components/Button';
import { ModalEmits, ModalProps, ModalSlots } from '../interfaces/components/Modal';


declare class Input extends ClassComponent<InputProps, {}, InputSlots> {}
declare class Select extends ClassComponent<SelectProps, {}, {}> {}
declare class Button extends ClassComponent<ButtonProps, ButtonEmits, ButtonSlots> {}
declare class Modal extends ClassComponent<ModalProps, ModalEmits, ModalSlots> {}

declare module '@vue/runtime-core' {
  export interface GlobalComponents {
    Input: GlobalComponentConstructor<Input>,
    Button: GlobalComponentConstructor<Button>,
    Icon: DefineComponent<FontAwesomeIconProps>,
    Modal: GlobalComponentConstructor<Modal>,
    Select: GlobalComponentConstructor<Select>,
  }
}