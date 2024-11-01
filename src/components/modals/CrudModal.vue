<template>
  <BasicModal 
    :open="props.open" 
    @close-modal="emit('close-modal'), state.confirmAction = false" 
  >
    <template #header>
      <slot name="header">

      </slot>
    </template>
    <template #body>
      <slot name="body"></slot>
    </template>
    <template #footer>
      <slot name="footer">
        <div class="has-text-right w-100">
          <button class="button is-danger is-light is-outlined ts-15"
            @click="emit('close-modal'), state.confirmAction = false"
          >
            Fechar
          </button>

          <button 
            v-if="state.objectViewMode !== 'create'"
            :class="{ 'is-loading': state.actionButtonDisabled }" 
            class="button is-danger"
            @click="state.confirmAction = true, 
            state.clickedAction = 'delete'"
          >
            Deletar
          </button>

          <button 
            v-if="state.objectViewMode === 'create'" 
            :class="{ 'is-loading': state.actionButtonDisabled }"
            class="button is-link" 
            @click="() => {
              emit('trigger-validation')
              if (props.canExecuteAction) {
                props.actionMiddleware('create')
                return
              }
              showValidationAlert()
            }"
          >
            Cadastrar
          </button>

          <button 
            v-else-if="state.objectViewMode === 'update'"
            :class="{ 'is-loading': state.actionButtonDisabled }" 
            class="button is-link"
            @click="state.confirmAction = true, state.clickedAction = 'update'"
          >
            Salvar
          </button>
        </div>
      </slot>

      <Transition name="slide">
        <div 
          class="footer-cover" 
          v-show="state.confirmAction"
        >
          <span 
            class="mr-4 has-text-weight-semibold" 
            v-if="state.clickedAction === 'update'"
          >
            Confirmar atualização?
          </span>
          <span 
            class="mr-4 has-text-weight-semibold" 
            v-else-if="state.clickedAction === 'delete'"
          >
            Deseja realmente deletar o item?
          </span>
          <button 
            :class="{ 'is-loading': state.actionButtonDisabled }" 
            class="button is-danger"
            @click="state.confirmAction = false"
          >
            Cancelar
          </button>
          <button 
            :class="{ 'is-loading': state.actionButtonDisabled }" 
            class="button is-link"
            @click="() => {
              emit('trigger-validation')
              if (props.canExecuteAction) {
                props.actionMiddleware(state.clickedAction)
                state.confirmAction = false
                return
              }
              showValidationAlert()
            }"
          >
            Confirmar
          </button>
        </div>
      </Transition>
    </template>
  </BasicModal>
</template>

<script setup lang="ts">
import BasicModal from "./BasicModal.vue"
import { reactive, watch } from 'vue'
import { useAlertStore } from "../../stores/alertStore"

const alertStore = useAlertStore()
const emit = defineEmits<{
  (event: 'close-modal'): void;
  (event: 'trigger-validation'): void;
}>()

interface Props {
  open: boolean;
  actionMiddleware?: Function;
  viewMode: string;
  canExecuteAction?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  open: false,
  viewMode: 'view',
  actionMiddleware: () => null,
  canExecuteAction: false
})

interface State {
  confirmAction: boolean;
  clickedAction: string;
  objectViewMode: string;
  actionButtonDisabled: boolean;
}

const state: State = reactive({
  confirmAction: false,
  clickedAction: '',
  objectViewMode: 'view',
  actionButtonDisabled: false,
})


function showValidationAlert() {
  alertStore.add({
    icon: 'circle-exclamation',
    type: 'danger',
    title: 'Atenção!',
    content: 'Preencha todos os campos corretamente.'
  }, 4)
}

watch(
  () => props.viewMode,
  (newValue) => {
    state.objectViewMode = newValue
  }
)

</script>

<style lang="scss" scoped>
.footer-cover {
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  padding: 16px;
  background-color: rgb(255, 255, 255);
  width: 100%;
  height: 80%;
  left: 0;
}

.slide-enter-from,
.slide-leave-to {
  transform: translateX(50px);
}

.slide-enter-to,
.slide-leave-from {
  transform: translateY(0px);
}

.slide-enter-active,
.slide-leave-active {
  transition: all 0.27s ease;
}

.slide-enter-from,
.slide-leave-to {
  opacity: 0;
}
</style>