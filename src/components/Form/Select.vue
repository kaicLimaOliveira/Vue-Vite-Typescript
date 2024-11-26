<template>
  <div class="select" @click="toggleDropdown">
    <div class="select-trigger">
      <span>
        {{ selectedOption?.label || 'Selecione' }}
      </span>
      <Icon icon="angle-down" class="select-icon" />
    </div>

    <ul v-if="isOpen" class="dropdown">
      <li 
        v-for="{ label, value } in props.options" 
        :key="value" 
        class="dropdown-item" 
        @click="selectOption(value)"
      >
        {{ label }}
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import { SelectProps } from '../../interfaces/components/Select';

const props = withDefaults(defineProps<SelectProps>(), {});
const model = defineModel<number | null>();
const isOpen = ref(false);

const selectedOption = computed(() =>
  props.options.find(option => option.value === model.value) || null
);

const toggleDropdown = () => {
  isOpen.value = !isOpen.value;
};

const selectOption = (value: number | null) => {
  model.value = value;
  isOpen.value = false;
};

const handleClickOutside = (event: Event) => {
  const target = event.target as HTMLElement;
  if (!target.closest('.select')) {
    isOpen.value = false;
  }
};

document.addEventListener('click', handleClickOutside);
</script>

<style lang="scss" scoped>
.select {
  position: relative;
  cursor: pointer;
  user-select: none;

  .select-trigger {
    box-sizing: border-box;
    position: relative;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0.5rem;
    border: 1px solid #ccc;
    border-radius: 4px;
    background-color: #fff;
    color: #333;
    transition: border-color 0.2s ease, background-color 0.2s ease;

    span {
      overflow: hidden;
    }

    .select-icon {
      margin-left: 0.5rem;
      font-size: 1rem;
      pointer-events: none;
    }
  }

  .dropdown {
    position: absolute;
    top: calc(100% + 4px);
    left: 0;
    right: 0;
    background: #fff;
    border: 1px solid #ccc;
    border-radius: 4px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    z-index: 1000;
    padding: 0;
    list-style: none;

    .dropdown-item {
      padding: 0.5rem;
      cursor: pointer;
      transition: background-color 0.2s ease;
  
      &:hover {
        background-color: #f0f0f0;
      }
    }
  }
}
</style>
