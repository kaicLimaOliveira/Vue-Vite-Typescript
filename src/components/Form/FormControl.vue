<template>
  <div class="input-field">
    <Label class="label" :for="id">{{ props.label }}</Label>
    <Input
      :help-text="props.helpText"
      v-model="model"
      v-bind="attrs"
    />
    <slot />
  </div>
</template>

<script lang="ts" setup>
import { useAttrs } from 'vue';
import Label from '../form/Label.vue'

const model = defineModel<string>()

interface FormControlProps {
  id?: string;
  label: string;
  helpText?: string;
}

const props = withDefaults(defineProps<FormControlProps>(), {})
const attrs = useAttrs();
</script>

<style lang="scss" scoped>
.input-field {
  margin-bottom: 1rem;
}
</style>
