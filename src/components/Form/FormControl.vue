<template>
  <div class="input-field">
    <Label class="label" :for="id" :label="props.label"></Label>
    <Input
      :help-text="props.helpText"
      v-model="modelValue"
      v-bind="attrs"
      @input="handleInput"
    />
    <slot />
  </div>
</template>

<script lang="ts" setup>
import { useAttrs, ref } from 'vue';
import Label from './Label.vue';

interface InputProps {
  id?: string;
  label: string;
  helpText?: string;
  modelValue: string;
}

const props = withDefaults(defineProps<InputProps>(), {})

const attrs = useAttrs();

const emit = defineEmits<{
  (e: 'update:modelValue', value: string): void;
}>();

const handleInput = (event: Event) => {
  const target = event.target as HTMLInputElement;
  emit('update:modelValue', target.value);
};

const modelValue = ref(props.modelValue);
</script>

<style lang="scss" scoped>
.input-field {
  margin-bottom: 1rem;
}
</style>
