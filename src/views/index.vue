<template>
  <div>
    <FormControl label="CPF:" v-model="state.cpf" v-mask="'###.###.###-##'" />
    <!-- <FormControl label="Placa:" v-model="state.carPlate" v-mask="'AAA #A##'" />
    <FormControl label="Telefone:" v-model="state.number" v-mask="'(##) # ####-####'" /> -->
  </div>
</template>

<script setup lang="ts">
import { reactive } from 'vue';
import FormControl from '../components/form/FormControl.vue';


const state = reactive({
  cpf: "",
  carPlate: "",
  number: "",
  toggle: true,
})
</script>