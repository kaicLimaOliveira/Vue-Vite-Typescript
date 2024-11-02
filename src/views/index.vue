<template>
  <div>
    <Input 
      type="text"
      label="Normal" 
      v-model="state.cpf"  
      v-mask="state.toggle ? '###.###.###-##' : '(##) #####-####'"
    />

    <button @click="state.toggle = !state.toggle">teste</button>

    <Input 
      type="text"
      label="Right" 
      v-model="state.cpf"  
      v-mask="'(##) #####-####'"
    /> 

    <div style="display: flex; justify-content: end;">
      <Input 
        type="text"
        label="Left" 
        v-model="state.cpf"  
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive } from 'vue';

const state = reactive({
  cpf: "",
  toggle: true,
})
</script>