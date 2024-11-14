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
      @selected-item="state.selectUser = $event"
      @view="state.openModal = true, state.objectViewMode = 'view'"
      @create="state.openModal = true, state.objectViewMode = 'create'"
      @update="state.openModal = true, state.objectViewMode = 'update'"
      @delete="state.showDeleteModal = true, state.objectViewMode = 'delete'"
      @current-page="state.tableCurrentPage = $event"
    ></Datatable>

    <Teleport to="#app">
      <CrudModal 
        :action-button-disabled="state.isLoadingButton"
        :open="state.openModal"
        :current-mode="state.objectViewMode" 
        :services="{
          create: createUser,
        }"
        @close-modal="state.openModal = false"
      >
        <template #body>
          <div class="columns">
            <div class="column">
              <FormControl 
                label="Primeiro nome:" 
                v-model="user.firstName" 
                :disabled="state.objectViewMode === 'view'"
              ></FormControl>
            </div>

            <div class="column">
              <FormControl 
                label="Último nome:" 
                v-model="user.lastName" 
                :disabled="state.objectViewMode === 'view'"
              ></FormControl>
            </div>
          </div>

          <FormControl 
            label="E-mail:" 
            v-model="user.email" 
            :disabled="state.objectViewMode === 'view'"
          ></FormControl>
        </template>
      </CrudModal>

      <Modal
        :open="state.showDeleteModal"
        @close-modal="state.showDeleteModal = false"
      >
        <template #header>
          <Icon icon="exclamation-triangle" class="is-danger mr-2"></Icon>
          Deletar usuário
        </template>
        <template #body>
          <div class="template-body">
            <span>
              Deseja realmente deletar o usuário<br>{{ user.id }}?
            </span>
          </div>
        </template>
        <template #footer>
          <Button 
            class="mr-2 is-link" 
            @click="deleteUser(user.id)"
          >
            Confirmar
          </Button>
          
          <Button class="is-danger" @click="state.showDeleteModal = false">
            Cancelar
          </Button>
        </template>
      </Modal>
    </Teleport>
  </div>
</template>

<script setup lang="ts">
import Datatable from '../components/Datatable.vue';
import { useUserService } from '../server/api/user';
import { User } from '../interfaces/User';
import { reactive } from 'vue';
import Modal from '../components/modals/Modal.vue';
import FormControl from '../components/Form/FormControl.vue';
import CrudModal from '../components/modals/CrudModal.vue';


interface State {
  users: {
    value: User[]
  };
  selectUser: string | number;

  isLoading: boolean;
  isLoadingButton: boolean;
  service: ReturnType<typeof useUserService>;
  
  objectViewMode: string;
  itemsPerPage: number;
  tableLength: number;
  tableCurrentPage: number;
  openModal: boolean;
  showDeleteModal: boolean;
}

const state: State = reactive({
  users: { value: [] },
  selectUser: 0,

  isLoading: false,
  isLoadingButton: false,
  service: useUserService(),

  objectViewMode: "",
  itemsPerPage: 10,
  tableLength: 0,
  tableCurrentPage: 1,

  openModal: false,
  showDeleteModal: false,
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
    user.id = result.id
    
  
    if (error) {
      console.log(error);
    }


  } finally {
    state.isLoading = false;
  }
}


async function createUser() {
  try {
    state.isLoadingButton = true;
    
    const { error, result } = await state.service.createUser(user);
    state.users.value.push(result);
  
    if (error) {
      console.log(error);
    }


  } finally {
    state.isLoadingButton = false;
  }
}


async function updateUser(id: string) {
  try {
    state.isLoadingButton = true;

    const { error, result } = await state.service.updateUser(id, user);
    const index = state.users.value.findIndex(u => u.id === id);
    state.users.value[index] = result;

    if (error) {
      console.log(error);
    }

  } finally {
    state.isLoadingButton = false;
  }
}


async function deleteUser(id: number | string) {
  try {
    state.isLoadingButton = true;

    const { error, result } = await state.service.deleteUser(id);
    const index = state.users.value.findIndex(u => u.id === id);
    
    console.log(result);
    console.log(index);
    
    // state.users.value.splice(index, 1);

    if (error) {
      console.log(error);
    }

  } finally {
    state.isLoadingButton = false;
  }
}
</script>

<style scoped lang="scss">
.columns {
  display: flex;
  width: 100%;
  gap: 12px;

  .column {
    flex: 1;
  }
}

.is-danger {
  color: var(--danger-color);
}

.template-body {
  text-align: center;

  span {
    font-weight: 500;
    font-size: 18px;
  }
}
</style>