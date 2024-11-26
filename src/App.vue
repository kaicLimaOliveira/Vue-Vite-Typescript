<template>
  <div id="container" :class="{ 'dark-theme': isDarkModeOn }">
    <RouterView v-slot="{ Component, route }">
      <ProgressAlert 
        class="alert"
        style="z-index: 9999;"
      ></ProgressAlert>
      
      <Navbar v-if="route.meta.enableNav" :router-links="state.routerLinks">
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
      </Navbar>

      <Transition v-else name="fade" mode="out-in">
        <component 
          :is="layoutComponent || 'div'" 
          class="component-without-navbar" 
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
import Navbar from "./components/Navbar.vue"
import ProgressAlert from "./components/ProgressAlert.vue";
import Loader from "./components/Loader.vue"

import { useDarkModeStore } from "./stores/darkStore";
import { useLoadingStore } from "./stores/loadingStore"
import { useNavbarStore } from "./stores/navbarStore";
import { reactive, computed, ref, watch } from "vue";
import { useRoute } from "vue-router";


const layoutComponent = ref<null | any>(null);
const layoutProps = ref<Record<string, any>>({});
const loadingStore = useLoadingStore();
const darkModeStore = useDarkModeStore()
const { getAvailableNavbarRoutes } = useNavbarStore()

const isDarkModeOn = computed(() => darkModeStore.isDarkModeOn)
const state = reactive({
  routerLinks: getAvailableNavbarRoutes()
})

const route = useRoute();
watch(
  () => route.path,
  async () => {
    if (route.meta?.layout) {
      try {
        const module = await route.meta.layout.component();
        layoutComponent.value = module.default;
        layoutProps.value = route.meta.layout.props || {};
      } catch (error) {
        console.error("Failed to load layout:", error);
        layoutComponent.value = null;
        layoutProps.value = {};
      }
    } else {
      layoutComponent.value = null;
      layoutProps.value = {};
    }
  },
  { immediate: true }
);
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
</style>