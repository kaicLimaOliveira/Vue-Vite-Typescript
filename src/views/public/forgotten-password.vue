<template>
  <form>
    <h2 class="title">Entre com seu e-mail</h2>
    <div class="content">
      <FormControl v-model="state.email" label="E-mail"></FormControl>

      <div class="separator">Recuperação de senha</div>
      <RouterLink :to="{ name: 'Login'}" class="button is-primary">
        <Button>
          Voltar
        </Button>
      </RouterLink>

      <Button class="button is-primary"> 
        Enviar
      </Button>
    </div>
  </form>
</template>

<script setup lang="ts">
import Button from '../../components/Button.vue';
import FormControl from '../../components/form/FormControl.vue';

import { reactive } from 'vue';

interface State {
  email: string;
}

const state: State = reactive({
  email: "",
})

defineExpose({
  state,
});
</script>

<style scoped lang="scss">
form {
  width: 420px;
  margin: 0 2rem;
  background-color: hsl(221, 14%, 100%);
  border-radius: 6px;
  box-shadow: 0 0.5em 1em -0.125em hsla(221deg, 14%, 4%,0.1),0 0px 0 1px hsla(221deg, 14%, 4%,0.02);
  color: hsla(221deg, 14%, 29%,1);
  display: block;
  padding: 2rem;

  .title {
    text-align: center;
  }

  .content {
    margin-top: 32px;

    .separator {
      display: flex;
      -webkit-box-align: center;
      align-items: center;
      font-size: 14px;
      color: var(--grey-800);
      margin: 32px 0px;

      &::before, &::after {
        content: "";
        flex: 1;
        height: 1px;
        background-color: var(--grey-800) ;
        margin: 0 16px;
      }
    }

    .button {
      font-weight: 500;
      width: 100%;
    }

    button.button {
      margin-top: 8px;
    }
  }
}
</style>