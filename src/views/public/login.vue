<template>
  <form @submit.prevent="login">
    <h2 class="title">Acesse sua conta</h2>
    <div class="content">
      <FormControl 
        v-model="loginState.email" 
        label="E-mail"
        icon="user"
      ></FormControl>

      <div class="password">
        <Label>Senha</Label>
        <Input 
          v-model="loginState.senha"
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
</template>

<script setup lang="ts">
import FormControl from '../../components/form/FormControl.vue';
import Label from '../../components/form/Label.vue';

import { reactive } from 'vue';
import { useRouter } from 'vue-router'
import { useAuthenticationService } from '../../server/api/authentication'
import { useLoadingStore } from '../../stores/loadingStore';

interface State {
  showPassword: boolean;
  service: ReturnType<typeof useAuthenticationService>
}

const state: State = reactive({
  showPassword: false,
  service: useAuthenticationService(),
})

interface Login {
  email: string;
  senha: string;
}

const loginState: Login = reactive({
  email: "",
  senha: "",
})


const loadingStore = useLoadingStore();
const router = useRouter();

async function login() {
  try {
    loadingStore.showPageLoader = true;
    // const { error, result } = await state.service.login(loginState);
    // console.log(result);
    
    
    router.push({ name: 'Home' })
  } catch (error) {
    router.push({ name: 'Login' })
  } finally {
    loadingStore.showPageLoader = false;
  }
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
          color: var(--grey-800);
          
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