<template>
  <label class="label" :for="props.id" v-bind="attrs">
    {{ props.label }}
  </label>
</template>

<script lang="ts" setup>
import { useAttrs } from 'vue';

interface LabelProps  {
  id?: string;
  label: string;
}

const props = withDefaults(defineProps<LabelProps>(), {
  label: "Label"
})

const attrs = useAttrs();
</script>

<style scoped lang="scss">
.label {
  font-weight: bold;
  margin-bottom: 0.5rem;
  display: block;
}
</style>