<template>
  <div class="input-field">
    <label class="label" :for="id">{{ props.label }}</label>
    <div class="control">
      <input
        class="input"
        v-model="modelValue"
        v-bind="attrs"
        @input="handleInput"
      />
    </div>
    <p class="help" v-if="props.helpText">{{ props.helpText }}</p>
  </div>
</template>

<script lang="ts" setup>
import { useAttrs } from 'vue';
import { ref } from 'vue';

interface InputProps {
  id?: string;
  label?: string;
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

  .label {
    font-weight: bold;
    margin-bottom: 0.5rem;
    display: block;
  }

  .control {
    position: relative;

    .input {
      border: 1px solid #dbdbdb;
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
  }

  .help {
    font-size: 0.875rem;
    color: #7a7a7a;
  }
}
</style>
