<template>
  <Transition name="modal" appear>
    <div class="custom-modal" v-show="props.open">
      <div class="modal-background" @click="emit('close-modal')"></div>
      <div class="h-100 is-flex is-align-items-center is-justify-content-center">
        <div 
          class="modal-card"
        >
          <header class="modal-card-head is-justify-content-space-between">
            <div class="has-text-weight-bold">
              <slot name="header"></slot>
            </div>
            <button class="delete" aria-label="close" @click="emit('close-modal')"></button>
          </header>
          <section class="modal-card-body">
            <slot name="body"></slot>
          </section>
          <footer class="modal-card-foot is-justify-content-end">
            <slot name="footer">
              <button class="button" @click="emit('close-modal')">
                Ok
              </button>
            </slot>
          </footer>
        </div>
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
  transition: opacity 0.3s ease;
}

.modal-enter-from,
.modal-leave-to {
  opacity: 0;
}

.custom-modal {
  top: 0;
  position: fixed;
  width: 100%;
  height: 100%;
  z-index: 1000;
}

.modal-background {
  background-color: rgba(0, 0, 0, 0.425);
}

.modal-card {
  transition: .3s;
}

.modal-card-head {
  background-color: white;
  border-bottom: 1px solid whitesmoke;
  border-top-left-radius: 8px;
  border-top-right-radius: 8px;
}

.modal-card-foot {
  background-color: white;
  border-top: 1px solid whitesmoke;
  border-bottom-left-radius: 8px;
  border-bottom-right-radius: 8px;
  position: relative;
}

.modal-card-body {
  overflow-x: hidden;
}
</style>