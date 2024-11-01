<template>
  <div>
    <Input 
      type="text"
      label="CPF:" 
      v-model="state.cpf" 
      v-tooltip="'Teste 1'" 
      v-mask="'###.###.###-##'"
    />

    <Input 
      type="text"
      label="CPF:" 
      v-model="state.cpf"  
      v-tooltip.top="'Teste 2'" 
    />

    <Input 
      type="text"
      label="CPF:" 
      v-model="state.cpf"  
      v-tooltip.right="'Teste 2'" 
    />

    <div style="display: flex; justify-content: end;">
      <Input 
        type="text"
        label="CPF:" 
        v-model="state.cpf"  
        v-tooltip.left="'Teste 2'" 
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive } from 'vue';

const state = reactive({
  cpf: ""
})
</script>