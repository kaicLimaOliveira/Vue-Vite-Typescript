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
    add(el: Alert, timeout?: number) {
      el.id = Math.round(Math.random() * 100000).toString()
      this.alerts.unshift(el)

      if (timeout != undefined) {
        setTimeout(() => this.remove(el), timeout * 1000)
      }

    },
    remove(el: Alert) {
      const i = this.alerts.indexOf(el)
      if (i > -1)
        this.alerts.splice(i, 1)
    },
  }
})
