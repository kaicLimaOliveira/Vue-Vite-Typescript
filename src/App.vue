<template>
  <div id="container" :class="{ 'dark-theme': isDarkModeOn }">
    <RouterView v-slot="{ Component, route }">
      <ProgressAlert 
        class="alert"
        style="z-index: 9999;"
      ></ProgressAlert>
      
      <Transition name="fade" mode="out-in">
        <component 
          :is="layoutComponent || 'div'" 
          class="component" 
          :key="route.path"
          v-bind="layoutProps"
        >
          <component :is="Component" />
        </component>
      </Transition>

      <Loader v-if="loadingStore.showPageLoader"></Loader>
    </RouterView>
  </div>
</template>

<script setup lang="ts">
import ProgressAlert from "./components/ProgressAlert.vue";
import Loader from "./components/Loader.vue"

import { useDarkModeStore } from "./stores/darkStore";
import { useLoadingStore } from "./stores/loadingStore"
import { computed, markRaw, ref, watch } from "vue";
import { useRoute, useRouter } from "vue-router";


const layoutComponent = ref<null | any>(null);
const layoutProps = ref<Record<string, any>>({});
const loadingStore = useLoadingStore();
const darkModeStore = useDarkModeStore()

const isDarkModeOn = computed(() => darkModeStore.isDarkModeOn)

const route = useRoute();
const router = useRouter();

router.isReady().then(() => updateLayout(route));

watch(
  () => route.path,
  () => updateLayout(route),
  { immediate: false } 
);

async function updateLayout(currentRoute: typeof route) {
  loadingStore.showPageLoader = true;
  if (currentRoute.meta?.layout) {
    try {
      const module = await currentRoute.meta.layout.component();
      layoutComponent.value = markRaw(module.default);
      layoutProps.value = currentRoute.meta.layout.props || {};
    } catch (error) {
      console.error("Erro ao carregar o layout:", error);
      layoutComponent.value = null;
      layoutProps.value = {};
    }
  } else {
    layoutComponent.value = null;
    layoutProps.value = {};
  }
  loadingStore.showPageLoader = false;
}
</script>

<style lang="scss">
@import './assets/styles/scss/globals.scss';
@import './assets/styles/scss/tooltip.scss';
@import './assets/styles/scss/helpers.scss';
@import './assets/styles/scss/dark-theme.scss';

.alert {
  position: absolute;
  display: flex;
  align-items: center;
  flex-direction: column;
  margin-top: 16px;
}

.layout-component {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}
</style>