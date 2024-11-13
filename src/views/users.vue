<template>
  <div>
    <Datatable 
      :headers
      :service="{
        getMany: getUsers,
        get: getUser,
      }" 
      :data="state.users"
      :items-per-page="state.itemsPerPage"
      :table-length="state.tableLength || 0"
      :is-loading="state.isLoading"
      :enable-create="true"
      :enable-update="true"
      :enable-delete="true"
      @current-page="state.tableCurrentPage = $event"
    ></Datatable>
  </div>
</template>

<script setup lang="ts">
import Datatable from '../components/Datatable.vue';
import UserService from '../server/api/user';
import { User } from '../interfaces/User';
import { reactive } from 'vue';


interface State {
  users: {
    value: User[]
  };
  isLoading: boolean;
  service: Readonly<UserService>;

  itemsPerPage: number;
  tableLength: number;
  tableCurrentPage: number;
}

const state: State = reactive({
  users: { value: [] },
  isLoading: false,
  service: new UserService(),

  itemsPerPage: 10,
  tableLength: 0,
  tableCurrentPage: 1,
})


const user: User = reactive({
  id: '',
  firstName: '',
  lastName: '',
  email: '',
  age: 0,
  birthDate: '',
  bloodGroup: '',
  gender: '',
  height: 0,
  weight: 0,
  image: '',
  phone: '',
  maidenName: '',
  password: '',
  username: '',
})


const headers = {
  firstName: 'Nome',
  age: 'Idade',
  email: 'E-mail',
  username: 'Usuário',
}


async function getUsers(params = '') {
  try {
    state.isLoading = true;
    
    const { error, result } = await state.service.getUsers(params);
    console.log(result);
    state.tableLength = result.total;
    if (state.users.value.length > 0) {
      state.users.value.splice((state.tableCurrentPage - 1) * state.itemsPerPage, state.itemsPerPage, ...result.users);
    } else {
      state.users.value = result.users
    }
    
  
    if (error) {
      console.log(error);
    }


  } finally {
    state.isLoading = false;
  }
}


async function getUser(userId: string) {
  try {
    state.isLoading = true;
    
    const { error, result } = await state.service.getUser(userId);
    console.log(result);
    
  
    if (error.value) {
      console.log(error.value);
    }


  } finally {
    state.isLoading = false;
  }
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