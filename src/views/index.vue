<template>
  <div>
    <FormControl label="teste" v-model="state.cpf" v-mask="'###.###.###-##'" />
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