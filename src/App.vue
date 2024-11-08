<template>
  <div :class="{ 'dark-theme': isDarkModeOn }">
    <RouterView v-slot="{ Component }">
      <ProgressAlert 
        v-if="$route.name == 'Datatables'"
        class="is-absolute is-flex is-align-items-center is-flex-direction-column mt-3"
        style="z-index: 9999;"
      ></ProgressAlert>
      
      <Navbar v-if="$route.meta.enableNav" :router-links="state.routerLinks">
        <Transition name="fade" mode="out-in">
          <Component 
            class="component" 
            :is="Component" 
            :key="$route.path"
          ></Component>
        </Transition>
      </Navbar>

      <Transition v-else name="fade" mode="out-in">
        <Component :is="Component" class="component-without-navbar" :key="$route.path"></Component>
      </Transition>

      <Loader v-if="loadingStore.isLoading"></Loader>
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
import { reactive, computed } from "vue";


const loadingStore = useLoadingStore();
const darkModeStore = useDarkModeStore()
const { getAvailableNavbarRoutes } = useNavbarStore()

const isDarkModeOn = computed(() => darkModeStore.isDarkModeOn)
const state = reactive({
  routerLinks: getAvailableNavbarRoutes()
})
</script>

<style lang="scss">
@import './assets/styles/scss/globals.scss';
@import './assets/styles/scss/tooltip.scss';
@import './assets/styles/scss/helpers.scss';
</style>