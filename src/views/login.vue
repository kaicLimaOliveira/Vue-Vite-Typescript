<template>
  <div class="login has-background-light columns">
    <div class="login-column-image">
      <figure>
        <img src="../assets/imgs/organizer.svg" width="500" alt="GPA image" />
      </figure>
    </div>

    <form>
      <h2 class="title">Acesse sua conta</h2>

      <div class="content">
        <Label  label="Login" id="login"></Label>
        <Input 
          type="text"
          label="E-mail"
          v-model="state.email" 
        />

        <div class="password">
          <Label label="Senha" id="login"></Label>
          <Input 
            type="password"
            label="Senha" 
            v-model="state.password" 
          />

          <div class="forget-password">
            <p>Esqueci minha senha</p>
          </div>
        </div>

        <div class="separator">Fazer login</div>

        <Button class="button is-primary" @click="login">
          ENTRAR
        </Button>
      </div>
    </form>
  </div>
</template>

<script setup lang="ts">
import { reactive } from 'vue';
import { useRouter } from 'vue-router'
import Button from '../components/Button.vue';
import Label from '../components/Form/Label.vue';

interface State {
  email: string;
  password: string;
}

const state: State = reactive({
  email: "",
  password: "",
})

const router = useRouter()

function login() {
  console.log("login");
  
  router.push({ name: 'Home' })
}
</script>

<style scoped lang="scss">
.login {
  display: flex;
  justify-content: space-around;
  align-items: center;
  margin: 0 auto;
  min-height: 100vh;
  background-color: hsl(0, 0%, 96%);

  &-column-image {
    display: flex;
    align-items: center;
    justify-content: center;
  }

  form {
    width: 400px;
    height: 400px;
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
        color: rgb(168, 168, 179);
        margin: 32px 0px;

        &::before, &::after {
          content: "";
          flex: 1;
          height: 1px;
          background-color: #a8a8b3;
          margin: 0 16px;
        }
      }

      .password {
        margin-top: 16px;

        input {
          margin-bottom: 4px;
        }

        .forget-password {
          margin-top: 6px;
          display: flex;
          justify-content: end;

          p {
            width: fit-content;
            text-decoration: underline;
            font-size: 12px;
            cursor: pointer;
            transition: filter .1s ease-in-out;
            
            &:hover {
              filter: brightness(40%);
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
  
}










.text-muted {
  font: 500 14px sans-serif;
  opacity: 0.8;

  &:hover {
    opacity: 1;
  }
}

.is-static {
  background-color: #C73E49;
  opacity: 0.8;
}

.is-default {
  background-color: #C73E49;
}


.icon-eye:hover {
  color: rgb(65, 65, 65);
}
</style>
