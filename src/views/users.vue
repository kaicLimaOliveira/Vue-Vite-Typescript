<template>
  <div>
    <Datatable 
      :headers
      :service="{
        getMany: state.service.getUsers,
        get: state.service.getUser,
      }" 
      :data="state.users"
      view-name="Users"
      :items-per-page="10"
    >

    </Datatable>
  </div>
</template>

<script setup lang="ts">
import { onMounted, reactive } from 'vue';
import UserService from '../server/api/user';
import { User } from '../interfaces/User';
import Datatable from '../components/Datatable.vue';


interface State {
  users: {
    value: User[]
  };
  isLoading: boolean;
  service: Readonly<UserService>;
}

const state: State = reactive({
  users: {
    value: []
  },
  isLoading: false,
  service: new UserService()
})


const user: User = reactive({
  id: '',
  name: '',
  email: '',
  dateOfBirth: new Date(),
})


const headers = {
  title: 'E-Mail',
  completed: 'Tipo'
}


async function createUser() {
  try {
    state.isLoading = true;
    
    const { error, result } = await state.service.createUser(user);
    state.users.value.push(result.value);
  
    if (error.value) {
      console.log(error.value);
    }


  } finally {
    state.isLoading = false;
  }
}


async function updateUser(id: string) {
  try {
    state.isLoading = true;

    const { error, result } = await state.service.updateUser(id, user);
    const index = state.users.value.findIndex(u => u.id === id);
    state.users.value[index] = result.value;

    if (error.value) {
      console.log(error.value);
    }

  } finally {
    state.isLoading = false;
  }
}


async function deleteUser(id: string) {
  try {
    state.isLoading = true;

    const { error } = await state.service.deleteUser(id);
    const index = state.users.value.findIndex(u => u.id === id);
    state.users.value.splice(index, 1);

    if (error.value) {
      console.log(error.value);
    }

  } finally {
    state.isLoading = false;
  }
}
</script>