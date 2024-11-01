<template>
  <div class="alert">
    <TransitionGroup name="alert">
      <div 
        v-for="alert, key in alertStore.alerts" :key="key" 
        class="alert-container"
        @click="alertStore.remove(alert)"
        :class="alert.type"
      >
        <div class="alert-container-columns">
          <div class="column-icon">
            <Icon :icon="alert.icon" />
          </div>

          <div class="column-content">
            <span class="column-content-title">{{ alert.title }}</span>
            <span class="column-content-text" v-html="alert.content"></span>
          </div>

          <div class="column-remove" @click="alertStore.remove(alert)">
            <Icon icon="xmark" class="icon-remove" />
          </div>
        </div>
        <div class="progress-bar">
          <progress class="progress-bar-value" max="100"></progress>
        </div>
      </div>
    </TransitionGroup>
  </div>
</template>

<script setup lang="ts">
import { useAlertStore } from "../stores/alertStore";
const alertStore = useAlertStore()
</script>

<style lang="scss" scoped>
.alert-enter-active,
.alert-leave-active {
  transition: all 0.35s ease;
}

.alert-enter-from,
.alert-leave-to {
  opacity: 0;
  transform: translateX(30px);
}

.alert {
  width: 100%;
  height: fit-content;

  &-container {
    width: 100%;
    max-width: 350px;
    min-height: 100px;
    border-radius: 5px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    overflow: hidden;
    box-shadow: 0 6px 18px rgba(0, 0, 0, 0.144);
    pointer-events: all;
    cursor: pointer;
    margin-bottom: 12px;

    &-columns {
      display: flex;
      padding: 6px;
      margin-top: 6px;

      .column-icon {
        flex: none;
        width: 12%;
        text-align: center;

        svg {
          color: #fff;
        }
      }

      .column-content {
        margin: 0 2px;
        color: #fff;
        width: 80%;

        &-title {
          font-size: 15px;
          font-weight: bold;
          display: block;
        }

        &-text {
          font-size: 12px;
          font-weight: 600;
        }
      }

      .column-remove {
        flex: none;
        width: 8%;
        text-align: center;

        .icon-remove {
          color: #fff;

          &:hover {
            filter: brightness(0.9);
          }
        }
      }
    }
  
    .progress-bar {
      opacity: 0.75;
      height: 0.75rem;
      position: relative;
      background: #fff;
      
      &-value {
        height: 100%;
        width: 100%;
        position: absolute;
        opacity: 0.2;
        background-image: linear-gradient(to right, rgb(255, 255, 255) 30%, rgb(241, 241, 241) 60%);
        animation: indeterminateAnimation 2s infinite linear;
        transform-origin: 0% 50%;
      }
    }
  }
}

@keyframes indeterminateAnimation {
  0% {
    transform:  translateX(0) scaleX(0);
  }
  40% {
    transform:  translateX(0) scaleX(0.4);
  }
  100% {
    transform:  translateX(100%) scaleX(0.5);
  }
}
</style>