<template>
  <div>users</div>
</template>

<script setup lang="ts">
import { onMounted, reactive } from 'vue';
import UserService from '../server/api/user';
import { User } from '../interfaces/User';


interface State {
  users: User[];
  isLoading: boolean;
  service: Readonly<UserService>;
}

const state: State = reactive({
  users: [],
  isLoading: false,
  service: new UserService()
})


const user: User = reactive({
  id: '',
  name: '',
  email: '',
  dateOfBirth: new Date(),
})


onMounted(() => {
  getUsers()
})


async function getUsers() {
  try {
    const { error, result } = await state.service.getUsers();
    state.users = result.value;
  
    if (error.value) {
      console.log(error.value);
    }

  } finally {
    state.isLoading = false;
  }
}


async function getUser(id: string) {
  try {
    state.isLoading = true;
    const { error, result } = await state.service.getUser(id);
    
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
    state.users.push(result.value);
  
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
    const index = state.users.findIndex(u => u.id === id);
    state.users[index] = result.value;

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
    const index = state.users.findIndex(u => u.id === id);
    state.users.splice(index, 1);

    if (error.value) {
      console.log(error.value);
    }

  } finally {
    state.isLoading = false;
  }
}
</script>