<template>
  <Modal 
    :open="props.open" 
    @close-modal="emit('close-modal'), state.confirmAction = false" 
  >
    <template #header>
      <slot name="header"></slot>
    </template>

    <template #body>
      <slot name="body"></slot>
    </template>

    <template #footer>
      <slot name="footer">
        <div class="footer-buttons">
          <Button class="is-danger light outlined"
            @click="emit('close-modal'), state.confirmAction = false"
          >
            Fechar
          </Button>

          <Button 
            v-if="state.objectViewMode !== 'create'"
            :loading="props.actionButtonDisabled" 
            class="is-danger"
            @click="state.confirmAction = true, state.clickedAction = 'delete'"
          >
            Deletar
          </Button>

          <Button 
            v-if="state.objectViewMode === 'create'" 
            :loading="props.actionButtonDisabled" 
            class="is-primary" 
            @click="props.services.create()"
          >
            Cadastrar
          </Button>

          <Button 
            v-else-if="state.objectViewMode === 'update'"
            :loading="props.actionButtonDisabled" 
            class="is-primary"
            @click="state.confirmAction = true, state.clickedAction = 'update'"
          >
            Salvar
          </Button>
        </div>
      </slot>

      <Transition name="slide">
        <div 
          class="footer-cover" 
          v-show="state.confirmAction"
        >
          <span 
            class="confirm-message" 
            v-if="state.clickedAction === 'update'"
          >
            Confirmar atualização?
          </span>
          <span 
            class="confirm-message" 
            v-else-if="state.clickedAction === 'delete'"
          >
            Deseja realmente deletar o item?
          </span>
          <Button 
            :loading="props.actionButtonDisabled" 
            class="is-danger"
            @click="state.confirmAction = false"
          >
            Cancelar
          </Button>

          <Button 
            :loading="props.actionButtonDisabled" 
            class="is-primary"
            @click="() => {
              emit('trigger-validation')
              // if (props.canExecuteAction) {
              //   // props.actionMiddleware(state.clickedAction)
              //   state.confirmAction = false
              //   return
              // }
              // showValidationAlert()
            }"
          >
            Confirmar
          </Button>
        </div>
      </Transition>
    </template>
  </Modal>
</template>

<script setup lang="ts">
import { reactive, watch } from 'vue';

const emit = defineEmits<{
  (e: 'close-modal'): void;
  (e: 'trigger-validation'): void;
}>()

interface Props {
  open: boolean;
  actionButtonDisabled: boolean;
  currentMode?: string;
  services: {
    create: () => Promise<any>;
    update?: () => Promise<any>;
  }
}

const props = withDefaults(defineProps<Props>(), {
  open: false,
  actionButtonDisabled: false,
  currentMode: 'view',
})

interface State {
  confirmAction: boolean;
  clickedAction: string;
  objectViewMode: string;
}

const state: State = reactive({
  confirmAction: false,
  clickedAction: '',
  objectViewMode: 'view'
})

watch(
  () => props.currentMode,
  (newValue) => {
    state.objectViewMode = newValue
  }
)
</script>

<style lang="scss" scoped>
.footer-buttons {
  display: flex;
  justify-content: flex-end;
  width: 100%;
  gap: 8px;
}

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

.confirm-message {
  margin-right: 1rem;
  font-weight: 600;
}

@keyframes loading-dots {
  0%, 100% {
    content: '';
  }
  33% {
    content: '.';
  }
  66% {
    content: '..';
  }
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
