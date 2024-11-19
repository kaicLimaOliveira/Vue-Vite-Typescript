import { VNode } from "vue";


/**
 * Props for the Modal component.
 */
interface ModalProps {
  /**
   * **open**:  
   * Controls whether the modal is visible.  
   * Set to `true` to display the modal and `false` to hide it.
   * 
   * @default false
   */
  open: boolean;
}


/**
 * Emits for the Modal component.
 */
interface ModalEmits {
  /**
   * **close-modal**:  
   * Emitted when the modal should be closed.  
   * Typically triggered by user interaction such as clicking the close button or the background overlay.
   * 
   * @event close-modal
   * @example
   * <CustomModal @close-modal="handleClose" />
   */
  (event: "close-modal"): void;
}


/**
 * Slots for the Modal component.
 *
 * These slots allow you to customize different sections of the modal.
 */
interface ModalSlots {
  /**
   * **Header Slot**:  
   * Customizes the content in the header section of the modal. Typically used to display a title or additional actions.
   * 
   * @example
   * <template #header>
   *   <h2>Modal Title</h2>
   * </template>
   */
  header?(): VNode[];

  /**
   * **Body Slot**:  
   * Customizes the content in the main body section of the modal. Use this to place the primary content of the modal.
   * 
   * @example
   * <template #body>
   *   <p>This is the main content of the modal.</p>
   * </template>
   */
  body?(): VNode[];

  /**
   * **Footer Slot**:  
   * Customizes the content in the footer section of the modal.  
   * If this slot is not used, a default "OK" button is displayed.
   * 
   * @example
   * <template #footer>
   *   <Button class="is-primary">Save</Button>
   *   <Button>Cancel</Button>
   * </template>
   */
  footer?(): VNode[];
}


export {
  ModalProps,
  ModalEmits,
  ModalSlots,
}