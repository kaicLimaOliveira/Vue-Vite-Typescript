<template>
  <div class="control">
    <input
      class="input"
      v-model="props.modelValue"
      v-bind="attrs"
      @input="handleInput"
    />
    <slot name="default" />
    <Icon v-if="props.icon" :icon="props.icon" />
  </div>
  <p class="help" v-if="props.helpText">{{ props.helpText }}</p>
</template>

<script lang="ts" setup>
import { useAttrs } from 'vue';
import { InputProps } from '../../interfaces/components/Input';

const props = withDefaults(defineProps<InputProps>(), {})
const attrs = useAttrs();

const emit = defineEmits<{
  'update:modelValue': [value: string];
}>();

const handleInput = (event: Event) => {
  const target = event.target as HTMLInputElement;
  emit('update:modelValue', target.value);
};
</script>

<style lang="scss" scoped>
.control {
  position: relative;
  display: flex;
  align-items: center;

  .input {
    border: 1px solid var(--grey-500);
    border-radius: 4px;
    padding: 0.5rem 1rem;
    width: 100%;
    transition: border-color 0.2s;
    font-size: 14px;
    font-weight: 500;
    font-family: 'Montserrat';

    &:focus {
      /* border-color: #00d1b2; */
      outline: none;
    }

    &:disabled {
      background-color: #f5f5f5;
    }
  }
  
  svg {
    position: absolute;
    right: 1.75rem;
    color: var(--black-600);
  }
}


.help {
  font-size: 0.875rem;
  color: #7a7a7a;
}
</style>
