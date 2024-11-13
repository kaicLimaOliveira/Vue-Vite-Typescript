<template>
  <div class="select">
    <select 
      v-bind="attrs" 
      v-model="state.option"
      @input="emit('update:modelValue', state.option)"
    >
      <option hidden>Selecione</option>
      <option :value v-for="{ label, value } in options">
        {{ label }}
      </option>
    </select>
    
    <Icon icon="angle-down" class="select-icon" />
  </div>
</template>

<script setup lang="ts">
import { reactive } from 'vue';
import { useAttrs } from 'vue';


const attrs = useAttrs();

interface State {
  option: string | number;
}

const state: State = reactive({
  option: ''
})

interface SelectProps {
  options: {
    label: string;
    value: string | number;
  }[]
}

const props = withDefaults(defineProps<SelectProps>(), {

})


const emit = defineEmits<{
  (e: 'update:modelValue', value: string | number): void;
}>();
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
