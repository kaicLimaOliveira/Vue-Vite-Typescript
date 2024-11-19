<template>
  <div class="select">
    <select 
      v-bind="attrs" 
      v-model="model"
      @change="handleSelect"
    >
      <option value="" disabled selected>Selecione</option>
      <option :value v-for="{ label, value } in props.options">
        {{ label }}
      </option>
    </select>

    <Icon icon="angle-down" class="select-icon" />
  </div>
</template>

<script setup lang="ts">
import { useAttrs } from 'vue';
import { SelectProps } from '../../interfaces/components/Select';

const model = defineModel<number>();
const attrs = useAttrs();
const props = withDefaults(defineProps<SelectProps>(), {});

function handleSelect(event: Event) {
  const target = event.target as HTMLInputElement;
  model.value = Number(target.value);
}
</script>

<style scoped lang="scss">
.select {
  position: relative;
  cursor: pointer;
  
  select {
    font-size: 1rem;
    padding: 0.5rem 2rem 0.5rem 0.5rem;
    border: 1px solid #ccc;
    border-radius: 4px; 
    background-color: #fff;
    color: #333;
    transition: border-color 0.2s ease, background-color 0.2s ease;
    width: 100%;
    appearance: none;
    -webkit-appearance: none;
    -moz-appearance: none;
    
    &:focus {
      outline: none;
    }

    &::-ms-expand {
      display: none; 
    }
  }

  .select-icon {
    position: absolute;
    width: 20px;
    right: 10px;
    top: 50%;
    transform: translateY(-50%);
    font-size: 1rem;
    color: #333;
    pointer-events: none;
  }
}
</style>
