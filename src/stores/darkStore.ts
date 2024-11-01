import { defineStore } from 'pinia'

export const useDarkModeStore = defineStore('dark', {
  state: () => ({
    isDarkModeOn: localStorage.getItem('isDarkModeOn') === 'true' || false
  }),
  actions: {
    toggleDarkMode() {
      this.isDarkModeOn = !this.isDarkModeOn
      localStorage.setItem('isDarkModeOn', this.isDarkModeOn.toString())
    }
  }
})