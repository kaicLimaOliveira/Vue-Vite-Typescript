<template>
  <div>
    <FormControl 
      v-tooltip.right="'teste'" 
      :label="state.toggle ? 'CPF': 'Placa'" 
      v-model="state.cpf" 
      v-mask="state.toggle ? '###.###.###-##' : '###-###'"
      style="width: 1000px;"
    ></FormControl>

    <Button @click="toggle">Trocar mascara</Button>
  </div>
</template>

<script setup lang="ts">
import { reactive } from 'vue';
import FormControl from '../../components/form/FormControl.vue';


const state = reactive({
  cpf: "",
  toggle: true,
})

const toggle = () => {
  state.toggle = !state.toggle
  state.cpf = ""
}
</script>

<style scoped lang="scss">
</style>