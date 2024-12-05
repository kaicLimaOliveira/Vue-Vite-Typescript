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
          <Button class="is-danger is-outlined"
            @click="emit('close-modal'), state.confirmAction = false"
          >
            Fechar
          </Button>

          <Button 
            v-if="state.objectViewMode !== 'create'"
            :loading="props.actionButtonDisabled" 
            class="is-danger is-outlined"
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
            class="is-danger is-outlined"
            @click="state.confirmAction = false"
          >
            Cancelar
          </Button>

          <Button 
            :loading="props.actionButtonDisabled" 
            class="is-primary"
            @click="props.services[state.clickedAction](), state.confirmAction = false"
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
    'create': () => Promise<any>;
    'update': (args?: any) => Promise<any>;
    'delete': (args?: any) => Promise<any>;
  }
}

const props = withDefaults(defineProps<Props>(), {
  open: false,
  actionButtonDisabled: false,
  currentMode: 'view',
})

interface State {
  confirmAction: boolean;
  clickedAction: 'create' | 'update' | 'delete';
  objectViewMode: string;
}

const state: State = reactive({
  confirmAction: false,
  clickedAction: 'create',
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
  bottom: 0;
  left: 0;
  width: 100%;
  padding: 0.75rem 1rem;
  background-color: #FFF; 
  display: flex;
  align-items: center;
  justify-content: end;
  gap: 8px; 
  border-top: 1px solid #dbdbdb; 
  border-bottom-left-radius: 4px;
  border-bottom-right-radius: 4px;
  transition: all 0.5s ease-in-out;

  .confirm-message {
    font-weight: 600;
    margin-right: 8px;
    color: var(--black-500);
  }

  .button {
    &.primary {
      background-color: #3273dc;
      color: #fff;
    }

    &.danger {
      background-color: #ff3860;
      color: #fff;
    }
  }
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
  transition: all .3s ease;
}

.slide-enter-from,
.slide-leave-to {
  opacity: 0;
}
</style>
