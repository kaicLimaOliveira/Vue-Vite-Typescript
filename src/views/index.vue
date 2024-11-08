<template>
  <div>
    <FormControl v-model="state.cpf" label="Teste" v-mask="'###.###.###-##'"  />
    <FormControl v-model="state.mask" label="Teste" v-mask="'###.###'"  />
  </div>
</template>

<script setup lang="ts">
import { reactive } from 'vue';
import FormControl from '../components/Form/FormControl.vue';

const state = reactive({
  valueMask: "",
  mask: "",
  cpf: "",
  toggle: true,
})
</script>