<template>
  <LoginLayout>
    <form @submit.prevent="login">
      <h2 class="title">Acesse sua conta</h2>
      <div class="content">
        <FormControl 
          v-model="state.email" 
          label="E-mail"
          icon="user"
        ></FormControl>

        <div class="password">
          <Label label="Senha"></Label>
          <Input 
            v-model="state.password"
            :type="state.showPassword ? 'text': 'password'"
          >
            <Icon 
              :icon="state.showPassword ? 'eye-slash': 'eye'" 
              @click="state.showPassword = !state.showPassword"
            ></Icon>
          </Input>

          <div class="forget-password">
            <RouterLink :to="{ name: 'ForgottenPassword' }">
              Esqueci minha senha
            </RouterLink>
          </div>
        </div>

        <div class="separator">Fazer login</div>

        <Button class="button is-primary">
          ENTRAR
        </Button>
      </div>
    </form>
  </LoginLayout>
</template>

<script setup lang="ts">
import FormControl from '../components/Form/FormControl.vue';
import Label from '../components/Form/Label.vue';
import LoginLayout from '../layouts/login-layout.vue';

import { reactive } from 'vue';
import { useRouter } from 'vue-router'

interface State {
  email: string;
  password: string;
  showPassword: boolean;
}

const state: State = reactive({
  email: "",
  password: "",
  showPassword: false,
})

const router = useRouter()

function login() {
  router.push({ name: 'Home' })
}
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
      color: var(--text-muted);
      margin: 32px 0px;

      &::before, &::after {
        content: "";
        flex: 1;
        height: 1px;
        background-color: var(--text-muted) ;
        margin: 0 16px;
      }
    }

    .password {
      margin-top: 16px;

      svg {
        position: absolute;
        right: 1.5rem;
        cursor: pointer;
      }

      .forget-password {
        display: flex;
        justify-content: end;
        margin-top: 4px;

        a {
          width: fit-content;
          text-decoration: underline;
          font-size: 12px;
          cursor: pointer;
          transition: opacity .1s ease-in-out;
          opacity: 0.8;
          color: var(--text-muted);
          
          &:hover {
            opacity: 1;

          }
        }
      }
    }

    .button {
      font-weight: 500;
      width: 100%;
    }
  }
}
</style>