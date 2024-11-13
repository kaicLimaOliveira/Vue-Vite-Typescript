<template>
  <div>
    <!-- <FormControl label="teste" v-model="state.cpf" v-mask="'###.###.###-##'" />
    <FormControl label="teste" v-model="state.carPlate" v-mask="'AAA #A##'" />
    <FormControl label="teste" v-model="state.number" v-mask="'(##) # ####-####'" /> -->
    index
  </div>
</template>

<script setup lang="ts">
import { reactive } from 'vue';
import FormControl from '../components/Form/FormControl.vue';

const state = reactive({
  cpf: "",
  carPlate: "",
  number: "",
  toggle: true,
})
</script>