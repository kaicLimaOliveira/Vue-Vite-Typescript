import { AllowedComponentProps, ComponentCustomProps, VNodeProps } from 'vue';

declare type PublicProps = VNodeProps & AllowedComponentProps & ComponentCustomProps;

export class ClassComponent<Props, Emits, Slots> {
  $props: Props & PublicProps;
  $emit: Emits;
  $slots: Slots;
}

export type GlobalComponentConstructor<T> = {
  new (): T;
};