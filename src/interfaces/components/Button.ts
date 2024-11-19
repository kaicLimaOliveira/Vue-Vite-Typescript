import { VNode } from "vue";

/**
 * Props defined for the Button component.
 */
interface ButtonProps {
  /**
   * Specifies the type of the button, which can change its visual style.
   * - 'primary': Main button.
   * - 'link': Button styled as a link.
   * - 'info': Informational button.
   * - 'success': Success button.
   * - 'warning': Warning button.
   * - 'danger': Danger button.
   * 
   */
  type?: 'primary' | 'link' | 'info' | 'success' | 'warning' | 'danger';

  /**
   * Specifies the size of the button.
   * - 'small': Small button.
   * - 'normal': Default size.
   * - 'medium': Medium-sized button.
   * - 'large': Large button.
   * 
   * @default 'normal'
   */
  size?: 'small' | 'normal' | 'medium' | 'large';

  /**
   * Indicates whether the button is in a loading state.
   * 
   * @default false
   */
  loading?: boolean;

  /**
   * Indicates whether the button is disabled.
   * 
   * @default false
   */
  disabled?: boolean;

  /**
   * Indicates whether the button should occupy the full width of the container.
   * 
   * @default false
   */
  fullwidth?: boolean;

  /**
   * Indicates whether the button should have an outlined style.
   * 
   * @default false
   */
  outlined?: boolean;
}

/**
 * Events emitted by the Button component.
 */
interface ButtonEmits {
  /**
   * Emitted when the button is clicked.
   * 
   * @event click
   */
  (event: 'click'): void;
}

/**
 * Slots available in the Button component.
 */
interface ButtonSlots {
  /**
   * Custom content such as icons, images, or text can be inserted into the button using the default slot.
   * 
   * **Note:** When the default slot is used, properties like `label`, `icon`, and `badge` are not applied.
   */
  default(): VNode[];
}

export {
  ButtonProps,
  ButtonEmits,
  ButtonSlots
};
