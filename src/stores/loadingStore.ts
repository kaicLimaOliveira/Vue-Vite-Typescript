import { defineStore } from "pinia";

export const useLoadingStore = defineStore('loading', {
  state: () => ({
    isLoading: false,
    showPageLoader: false,
  }),
  getters: {
    loading: (state) => state.isLoading = true,
  }
})
