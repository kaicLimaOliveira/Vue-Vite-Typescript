<template>
  <div>
    <!-- <CrudLayout
      title="Cadastro de usuários"
      view-name="Users"
      @click="state.openModal = true"
    ></CrudLayout> -->

    <Datatable 
      :headers
      :service="getServices" 
      :data="state.users"
      :items-per-page="state.table.itemsPerPage"
      :table-length="state.table.tableLength || 0"
      :is-loading="state.isLoading"
      :enable-create="true"
      :enable-update="true"
      :enable-delete="true"
      @selected-item="state.selectUser = $event"
      @view="state.openModal = true, state.objectViewMode = 'view'"
      @update="state.openModal = true, state.objectViewMode = 'update'"
      @delete="state.showDeleteModal = true, state.objectViewMode = 'delete'"
      @current-page="state.table.tableCurrentPage = $event"
    ></Datatable>

    <Teleport to="#app">
      <CrudModal 
        :action-button-disabled="state.isLoadingButton"
        :open="state.openModal"
        :current-mode="state.objectViewMode" 
        :services="crudServices"
        @close-modal="state.openModal = false"
      >
        <template #header>Tela de usuários</template>
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
            :loading="state.isLoadingButton"
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
import CrudModal from '../components/modals/CrudModal.vue';
import Datatable from '../components/Datatable.vue';
import FormControl from '../components/Form/FormControl.vue';
import Modal from '../components/modals/Modal.vue';

import { computed, reactive } from 'vue';
import { User } from '../interfaces/User';

import { useUserService } from '../server/api/user';
import { useAlertStore } from '../stores/alertStore';
import CrudLayout from '../layouts/crud-layout.vue';


const alertStore = useAlertStore();

interface State {
  users: {
    value: User[]
  };
  selectUser: string | number;

  isLoading: boolean;
  isLoadingButton: boolean;
  service: ReturnType<typeof useUserService>;
  
  table: {
    itemsPerPage: number;
    tableLength: number;
    tableCurrentPage: number;
  }
  
  objectViewMode: string;
  openModal: boolean;
  showDeleteModal: boolean;
}

const state: State = reactive({
  users: { value: [] },
  selectUser: 0,

  isLoading: false,
  isLoadingButton: false,
  service: useUserService(),

  table: {
    itemsPerPage: 10,
    tableLength: 0,
    tableCurrentPage: 1,
  },
  
  objectViewMode: "",
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
    
    state.table.tableLength = result.total;

    if (state.users.value.length > 0) {
      state.users.value.splice((state.table.tableCurrentPage - 1) * state.table.itemsPerPage, state.table.itemsPerPage, ...result.users);
    } else {
      state.users.value = result.users
    }
    
  
    if (error) {
      return alertStore.add({
        title: 'Falha ao buscar os usuários',
        content: `O seguinte erro foi apresentado: ${error.message}`,
        type: 'error',
        icon: 'circle-xmark'
      })
    }

  } finally {
    state.isLoading = false;
  }
}


async function getUser(userId: string) {
  try {
    state.isLoading = true;
    
    const { error, result } = await state.service.getUser(userId);
    Object.assign(user, result);
  
    if (error) {
      return alertStore.add({
        title: 'Falha ao buscar o usuário',
        content: `O seguinte erro foi apresentado: ${error.message}`,
        type: 'error',
        icon: 'circle-xmark'
      })
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
      return alertStore.add({
        title: 'Falha ao criar um usuário',
        content: `O seguinte erro foi apresentado: ${error.message}`,
        type: 'error',
        icon: 'circle-xmark'
      })
    }

    return alertStore.add({
      title: 'Sucesso!',
      content: 'Usuário criado com sucesso',
      type: 'success',
      icon: 'circle-check'
    })

  } finally {
    state.isLoadingButton = false;
    state.openModal = false;
  }
}


async function updateUser(id: number | string) {
  try {
    state.isLoadingButton = true;

    const { error, result } = await state.service.updateUser(id, user);
    const index = state.users.value.findIndex(u => u.id === id);
    state.users.value[index] = result;

    if (error) {
      return alertStore.add({
        title: 'Falha ao atualizar um usuário',
        content: `O seguinte erro foi apresentado: ${error.message}`,
        type: 'error',
        icon: 'circle-xmark'
      })
    }

    return alertStore.add({
      title: 'Sucesso!',
      content: 'Usuário atualizado com sucesso',
      type: 'success',
      icon: 'circle-check'
    })

  } finally {
    state.isLoadingButton = false;
    state.openModal = false;
  }
}


async function deleteUser(id: number | string) {
  try {
    state.isLoadingButton = true;

    const { error } = await state.service.deleteUser(id);
    const index = state.users.value.findIndex(u => u.id === id);
    state.users.value.splice(index, 1);

    if (error) {
      alertStore.add({
        title: 'Falha ao excluir um usuário',
        content: `O seguinte erro foi apresentado: ${error.message}`,
        type: 'error',
        icon: 'circle-xmark'
      })
    } else {
      alertStore.add({
        title: 'Sucesso!',
        content: 'Usuário excluído com sucesso',
        type: 'success',
        icon: 'circle-check'
      })
    }


  } finally {
    state.isLoadingButton = false;
    state.showDeleteModal = false;
  }
}

function resetFields() {
  Object.assign(user, {})
}


const getServices = computed(() => {
  return {
    getMany: getUsers,
    get: getUser,
  }
})

const crudServices = computed(() => {
  return {
    create: createUser,
    update: updateUser,
    delete: deleteUser,
  }
})
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