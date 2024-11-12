<template>
  <button
    :class="[
      'button',
      typeClass,
      sizeClass,
      { 'is-loading': loading },
      { 'is-fullwidth': fullwidth },
      { 'is-outlined': outlined }
    ]"
    :disabled="disabled"
    v-bind="attrs"
    @click="handleClick"
  >
    <slot />
  </button>
</template>

<script setup lang="ts">
import { computed, useAttrs } from 'vue';
import { ButtonProps } from '../interfaces/Components';


const props = defineProps<ButtonProps>();

const emits = defineEmits<{
  (e: 'click'): void;
}>();


const attrs = useAttrs();
const typeClass = computed(() => (props.type ? `is-${props.type}` : ''));
const sizeClass = computed(() => (props.size ? `is-${props.size}` : ''));

const handleClick = () => {
  if (!props.disabled && !props.loading) {
    emits('click');
  }
};
</script>

<style scoped lang="scss">
$button-padding-y: 0.5em;
$button-padding-x: 1em;
$button-border-radius: 4px;
$button-font-size: 1rem;
$button-line-height: 1.5;

.button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: $button-padding-y $button-padding-x;
  font-size: $button-font-size;
  line-height: $button-line-height;
  border-radius: $button-border-radius;
  border: 1px solid transparent;
  cursor: pointer;
  white-space: nowrap;
  text-align: center;
  transition: all 0.2s ease-in-out;

  &:hover:not(:disabled) {
    filter: brightness(90%);
  }

  &:disabled {
    cursor: not-allowed;
    opacity: 0.65;
  }

  &.is-loading {
    position: relative;
    color: transparent;
    
    &::after {
      content: '';
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      border: 2px solid currentColor;
      border-radius: 50%;
      border-top-color: transparent;
      width: 1em;
      height: 1em;
      animation: spin 0.5s linear infinite;
    }
  }

  &.is-primary {
    background-color: var(--primary-color);
    color: #fff;
    border-color: transparent;
  }
  
  &.is-link {
    background-color: var(--link-color);
    color: #fff;
    border-color: transparent;
  }
  
  &.is-info {
    background-color: var(--info-color);
    color: #fff;
    border-color: transparent;
  }
  
  &.is-success {
    background-color: var(--success-color);
    color: #fff;
    border-color: transparent;
  }
  
  &.is-warning {
    background-color: var(--warning-color);
    color: #fff;
    border-color: transparent;
  }
  
  &.is-danger {
    background-color: var(--danger-color);
    color: #fff;
    border-color: transparent;
  }

  &.is-outlined {
    background: none;
    color: inherit;
    border-color: currentColor;

    &:hover:not(:disabled) {
      background-color: currentColor;
      color: #fff;
    }
  }

  &.is-fullwidth {
    width: 100%;
  }
}

.is-small {
  font-size: 0.875rem;
  padding: 0.375em 0.75em;
}

.is-medium {
  font-size: 1.25rem;
  padding: 0.625em 1.25em;
}

.is-large {
  font-size: 1.5rem;
  padding: 0.75em 1.5em;
}

@keyframes spin {
  to {
    transform: translate(-50%, -50%) rotate(360deg);
  }
}
</style>
