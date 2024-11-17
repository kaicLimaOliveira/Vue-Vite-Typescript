import { defineStore } from "pinia";
import { Alert } from "../interfaces/Alert";

interface State {
  alerts: Alert[];
}

export const useAlertStore = defineStore('alert', {
  state: (): State => ({
    alerts: [],
  }),
  actions: {
    add(el: Alert, timeout = 5) {
      el.id = Math.round(Math.random() * 100000).toString()
      this.alerts.unshift(el)

      const delay = timeout * 1000;
      setTimeout(() => this.remove(el), delay)
    },
    remove(el: Alert) {
      const i = this.alerts.indexOf(el)
      if (i > -1)
        this.alerts.splice(i, 1)
    },
  }
})
