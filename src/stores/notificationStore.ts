import { defineStore } from "pinia";
import { Notification } from "../interfaces/Notification";

interface State {
  connection: WebSocket | null;
  notifications: Notification[];
  fullLength: number;
}

export const useNotificationStore = defineStore('notification', {
  state: (): State => {
    return {
      connection: null,
      notifications: [],
      fullLength: 0,
    }
  },
  actions: {
    add(el: Notification) {
      this.notifications.unshift(el)
    },
    remove(notificationId: number) {
      const i = this.notifications.findIndex(e => e.id === notificationId)
      if (i > -1)
        this.notifications.splice(i, 1)
    },
    connectToServer() {
      console.log('[websocket] connecting...')

      const csrftoken = localStorage.getItem('csrftoken')
      const applcationId = import.meta.env.VITE_APPLICATION_ID
      const queryParams = `csrftoken=${csrftoken}&applicationId=${applcationId}`

      this.connection = new WebSocket(import.meta.env.VITE_WEBSOCKET_URL + `ws/notifications/?${queryParams}`)

      this.connection.onopen = (event: Event) => {
        console.log('[websocket] connected.');
      }

      this.connection.onmessage = (event: MessageEvent) => {
        const response = JSON.parse(event.data)
        console.log(response);

        if (!response.error) {
          const { data } = response
          this.notifications.unshift(data)
          this.fullLength++
        }
      }

      this.connection.onerror = (event: Event) => {
        console.log("[websocket] connection error...");
        setTimeout(() => this.connectToServer(), 10000)
      }
    }
  }
})
