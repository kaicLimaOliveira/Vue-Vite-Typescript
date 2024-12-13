<template>
  <div>
    <div class="collapse-bg" v-show="state.show" @click="state.show = false"></div>
    <div class="collapse-container">
      <div class="collapse-slot" @click="state.show = true">
        <slot name="icon"></slot>
      </div>
      
      <div class="collapse" v-show="state.show">
        <div class="collapse-header">
          <slot name="header"></slot>
        </div>

        <div class="collapse-content">
          <slot name="content"></slot>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive } from 'vue';

interface State {
  show: boolean;
}

const state: State = reactive({
  show: false,
});
</script>

<style lang="scss" scoped>
.collapse-bg {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  z-index: 150;
}

.collapse-container {
  position: relative;

  .collapse-slot {
    position: relative;
    display: flex;
  }

  .collapse {
    position: absolute;
    z-index: 200;
    top: 40px;
    background-color: white;
    box-shadow: 0 6px 18px rgba(0, 0, 0, 0.144);
    border-radius: 6px;
    overflow: hidden;
    left: -65px;
    width: max-content;

    &-header {
      font-size: 16px;
      border-bottom: 1px solid #eeee;
      width: 100%;
      padding: 12px 16px;
    }

    &-content {
      padding: 4px 16px;
    }
  }
}
</style>