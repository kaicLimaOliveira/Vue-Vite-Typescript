<template>
  <Transition name="modal" appear>
    <div class="custom-modal" v-show="props.open">
      <div class="modal-background" @click="emit('close-modal')"></div>
      <div class="modal-card">
        <header class="modal-card-head">
          <p class="modal-card-title">
            <slot name="header"></slot>
          </p>
          <Icon icon="xmark" class="modal-close" @click="emit('close-modal')" />
        </header>

        <section class="modal-card-body">
          <slot name="body"></slot>
        </section>

        <footer class="modal-card-foot">
          <slot name="footer">
            <Button class="is-primary" @click="emit('close-modal')">
              OK
            </Button>
          </slot>
        </footer>
      </div>
    </div>
  </Transition>
</template>

<script setup lang="ts">
const emit = defineEmits<{
  (event: "close-modal"): void,
}>()

interface Props {
  open: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  open: false,
})
</script>

<style lang="scss" scoped>
.modal-enter-from,
.modal-leave-to .modal-card {
  transform: translateY(-25px);
}

.modal-enter-to,
.modal-leave-from .modal-card {
  transform: translateY(0px);
}

.modal-enter-active,
.modal-leave-active {
  transition: opacity 0.5s ease;
}

.modal-enter-from,
.modal-leave-to {
  opacity: 0;
}

.custom-modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;

  .modal-background {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.425);
  }

  .modal-card {
    position: relative;
    max-width: 600px;
    width: 100%;
    background-color: white;
    border-radius: .25rem;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
    transition: transform 0.3s ease, opacity 0.3s ease;

    .modal-card-head {
      border-top-left-radius: .25rem;
      border-top-right-radius: .25rem;
      border-bottom: 1px solid #eee;
      color: var(--black-500);

      .modal-card-title {
        font-weight: 600;
        font-size: 1rem;
        display: flex;
        align-items: center;  
      }

      .modal-close {
        background: none;
        border: none;
        font-size: 1.5rem;
        line-height: 1;
        cursor: pointer;
        position: absolute;
        top: 0.75rem;
        right: 0.75rem;
      }
    }

    .modal-card-body {
      padding: 1rem;
      overflow-x: hidden;
    }

    .modal-card-foot {
      border-top: 1px solid #eee;
      border-bottom-left-radius: .25rem;
      border-bottom-right-radius: .25rem;
      padding: 0.75rem 1rem;
      justify-content: flex-end;
    }
  }

  .modal-card-head,
  .modal-card-foot {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 1rem;
    background-color: white;
    border: none;
  }  
}
</style>