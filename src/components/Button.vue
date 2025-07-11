<template>
  <button
    :class="[
      'button',
      typeClass,
      sizeClass,
      { 'is-loading': props.loading },
      { 'is-fullwidth': props.fullwidth },
      { 'is-outlined': props.outlined }
    ]"
    :disabled="props.disabled || props.loading"
    v-bind="attrs"
    @click="handleClick"
  >
    <slot v-if="!props.loading" />
  </button>
</template>

<script setup lang="ts">
import { computed, useAttrs } from 'vue';
import { ButtonProps, ButtonEmits } from '../interfaces/components/Button';


const props = defineProps<ButtonProps>();
const emit = defineEmits<ButtonEmits>();

const attrs = useAttrs();
const typeClass = computed(() => (props.type ? `is-${props.type}` : ''));
const sizeClass = computed(() => (props.size ? `is-${props.size}` : ''));

const handleClick = () => {
  if (!props.disabled && !props.loading) {
    emit('click');
  }
};
</script>

<style scoped lang="scss">
.button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 0.5rem 1rem;
  font-size: 1rem;
  line-height: 1.5;
  border-radius: 4px;
  cursor: pointer;
  white-space: nowrap;
  text-align: center;
  transition: all 0.2s ease-in-out;
  min-width: 90px;
  background-color: #f8f8f8;
  border: .5px solid #d6d9e0;
  font-weight: 500;
  height: 40px;
  font-family: 'Montserrat', sans-serif;

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
    border-color: currentColor;
    color: currentColor;

    &:hover:not(:disabled) {
      background-color: currentColor;
      color: #fff;
    }
  }

  &.is-danger.is-outlined {
    color: var(--danger-color);
    border-color: var(--danger-color);

    &:hover:not(:disabled) {
      background-color: var(--danger-color); 
      color: #fff; 
    }
  }

  &.is-primary.is-outlined {
    color: var(--primary-color);
    border-color: var(--primary-color);

    &:hover:not(:disabled) {
      background-color: var(--primary-color); 
      color: #fff; 
    }
  }

  &.is-link.is-outlined {
    color: var(--link-color);
    border-color: var(--link-color);

    &:hover:not(:disabled) {
      background-color: var(--link-color); 
      color: #fff; 
    }
  }

  &.is-info.is-outlined {
    color: var(--info-color);
    border-color: var(--info-color);

    &:hover:not(:disabled) {
      background-color: var(--info-color); 
      color: #fff; 
    }
  }

  &.is-success.is-outlined {
    color: var(--success-color);
    border-color: var(--success-color);

    &:hover:not(:disabled) {
      background-color: var(--success-color); 
      color: #fff; 
    }
  }

  &.is-warning.is-outlined {
    color: var(--warning-color);
    border-color: var(--warning-color);

    &:hover:not(:disabled) {
      background-color: var(--warning-color); 
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
