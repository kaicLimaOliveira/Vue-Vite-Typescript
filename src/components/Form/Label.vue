<template>
  <label class="label" :for="props.id" v-bind="attrs">
    <slot />
  </label>
</template>

<script lang="ts" setup>
import { useAttrs } from 'vue';

interface LabelProps  {
  id?: string;
}

const props = withDefaults(defineProps<LabelProps>(), {})
const attrs = useAttrs();
</script>

<style scoped lang="scss">
.label {
  font-weight: bold;
  margin-bottom: 0.5rem;
  display: block;
  font-size: 0.875rem;
  color: var(--black-500);
}
</style>