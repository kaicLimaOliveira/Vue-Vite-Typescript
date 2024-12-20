<template>
  <div>
    <div class="notification-bg" v-show="state.show" @click="closeNotificationsPanel"></div>
    <div class="notification-container">
      <div class="notification-icon" @click="state.show = true">
        <Icon icon="bell" :class="{ 'animation-bell': notificationStore.fullLength > 0 }" />
        <span v-show="notificationStore.fullLength > 0" class="notifications-number" @click="state.show = true">
          {{ notificationStore.fullLength > 99 ? '99+' : notificationStore.fullLength }}
        </span>
      </div>

      <div class="notifications" v-show="state.show">
        <div class="notifications-options">
          <span>NOTIFICAÇÕES</span>
          <RouterLink 
            :to="{ name: 'NotificationsHistory' }"
            class="router-link" 
            @click="closeNotificationsPanel"
          >
            VER TUDO
          </RouterLink>
        </div>

        <hr />

        <div class="notifications-content">
          <div 
            v-for="notification, key in firstNotifications" :key
            class="notifications-item" 
            @click="seeNotification(notification.id)"
          >
            <div class="notifications-item-options">
              <div>
                
                <div class="notifications-line" :style="{ visibility: key == 0 ? 'hidden' : 'visible' }"></div>
                <div class="notifications-dot" :class="notification.type"></div>
                <div class="notifications-line" :style="{ visibility: key == firstNotifications.length - 1 ? 'hidden' : 'visible' }"></div>
              </div>

              <div class="notifications-item-content">
                <span>{{ phraseDotsMask(notification.title) }}</span>
                <small>{{ dateHistoryMask(notification.createdAt) }}</small>
              </div>
            </div>

            <Icon 
              icon="circle-xmark"
              size="10x"
              @click.stop="[getNotification(notification.id), notificationStore.fullLength--]"
              class="delete"
            ></Icon>
          </div>

          <div v-show="notificationStore.fullLength > 4" class="notifications-history">
            <hr class="my-0">
            <div 
              class="more-notifications-container"
              @click="[
                router.push({ name: 'NotificationsHistory' }), 
                closeNotificationsPanel()
              ]"
            >
              <span>
                Mais ({{ notificationStore.fullLength - 4 }})
              </span>
            </div>
          </div>

          <div v-show="notificationStore.fullLength == 0" class="no-notifications">
            Nenhuma notificação.
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive, computed, onMounted, watch } from "vue";
import { useRouter } from "vue-router";

import { useNotificationStore } from "../stores/notificationStore"
import { useAlertStore } from "../stores/alertStore";

import { dateHistoryMask, phraseDotsMask } from "../utils/helpers/masks";
import { parseQueryParams } from "../utils/helpers/parsers";
import NotificationService from "../server/api/notification";


const notificationStore = useNotificationStore()
const alertStore = useAlertStore()
const router = useRouter()


interface State {
  show: boolean;
  notificationsLimit: number;
  notificationsLengthTriggerValue: number;
  service: Readonly<NotificationService>;
}

const state: State = reactive({
  show: false,
  notificationsLimit: 10,
  notificationsLengthTriggerValue: 6,
  service: new NotificationService(),
});


onMounted(() => {
  // notificationStore.connectToServer()
  getManyNotifications(parseQueryParams({
    'seen': 'false',
    'limit': state.notificationsLimit
  }))
})


const firstNotifications = computed(() => {
  return notificationStore.notifications.slice(0, 4)
})


function seeNotification(notificationId: number) {
  closeNotificationsPanel()
  getNotification(notificationId)
  router.push({ name: 'NotificationsHistory', query: { 'selectedNotification': notificationId } })
}


const closeNotificationsPanel = () => state.show = false;


watch(
  () => notificationStore.notifications.length,
  (newValue, oldValue) => {
    if (oldValue != 0 && newValue == state.notificationsLengthTriggerValue && notificationStore.fullLength > newValue) {      
      queryFilterNotifications()
    }
  }
)


function getManyNotifications(params = '') {
  state.service.getNotifications(params)
    .then(res => {
      // notificationStore.notifications.push(...res.result.value.data.map((notification => {
      //   return {
      //     ...notification,
      //     id: notification.id,
      //     title: 'Nova nota de execução. Clique para ver.',
      //     content: notification.note,
      //     created_at: notification.registration_datetime,
      //     type: 'success',
      //     link_mode: 'route',
      //     link: 'Dashboard',
      //     link_text: 'Visualizar nota'
      //   }
      // })))

      // notificationStore.fullLength = res.headers['x-total-count']
    })
    .catch((err) => {
      alertStore.add({
        type: 'error',
        title: 'Oops...',
        content: err.response.data.msg
      })
    })
}


function getNotification(notificationId: number) {
  notificationStore.remove(notificationId)
  getNotification(notificationId)
    // .then(() => {
    //   notificationStore.notifications[notificationStore.notifications.findIndex(e => e.id === notificationId)].seen = true
    // })
    // .catch((err: any) => alertStore.add({
    //   type: 'danger',
    //   title: 'Oops...',
    //   content: err.response.data.msg
    // }))
}


function getDynamicNotificationsLimit() {
  let limit = 0
  for (let i = notificationStore.notifications.length; i < state.notificationsLimit; i++) {
    limit++
  }
  return limit
}


function queryFilterNotifications() {
  const params = {
    // 'mode': 'unseen',
    'seen': 'false',
    'offset': state.notificationsLimit - getDynamicNotificationsLimit(),
    'limit': getDynamicNotificationsLimit()
  }

  getManyNotifications(parseQueryParams(params))
}
</script>

<style lang="scss" scoped>
.notification-bg {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  z-index: 150;
}

.notification-container {
  position: relative;

  .notification-icon {
    position: relative;
    display: flex;
  
    svg {
      cursor: pointer;
      font-size: 1.25rem;
    }
  
    .notifications-number {
      position: absolute;
      top: -4px;
      right: -9px;
      font-size: 11px;
      border-radius: 50%;
      min-width: 17px;
      min-height: 17px;
      background-color: rgb(247, 97, 97);
      color: white !important;
      font-weight: bold;
      box-sizing: border-box;
      text-align: center;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
    }
  }

  .notifications {
    position: absolute;
    width: 350px;
    z-index: 200;
    top: 30px;
    background-color: white;
    box-shadow: 0 6px 18px rgba(0, 0, 0, 0.144);
    border-radius: 7px;
    overflow: hidden;
  
    .notifications-options {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 1rem;
      color: 	#b5b5b5;
  
      span {
        font-weight: bold;
        font-size: 14px;
        align-self: start;
        letter-spacing: 2px;
      }
  
      .router-link {
        font-weight: bold;
        font-size: 12px;
        transition: .150ms;
        position: relative;
        margin-right: 10px;
        color: #dc3545;
        letter-spacing: 1px;

        &:hover {
          color: var(--link);

          &::before {
            background-color: rgba(199, 199, 199, 0.137);
          }
        }
        
        &::before {
          content: '';
          position: absolute;
          border-radius: 5px;
          width: 125%;
          height: 130%;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          transition: .2s;
        }
      }
    }
  
    hr {
      margin: auto 0;
    }
  
    .notifications-content {
      display: flex;
      flex-direction: column;
  
      .notifications-item {
        min-height: 50px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        cursor: pointer;
        transition: .15s;
  
        .notifications-item-options {
          display: flex;
  
          div {
            display: flex;
            flex-direction: column;
            align-items: center;
            margin-left: 1rem;
            align-self: stretch;
  
            .notifications-dot {
              width: 10px;
              height: 10px;
              border-radius: 50%;
              flex-shrink: 0;
            }
  
            .notifications-line {
              margin-left: 19px;
              width: 3px;
              height: 100%;
              background-color: rgb(223, 223, 223);
            }
          }
        }
    
        & .delete {
          transform: translateX(24px);
          transition: .1s;
          opacity: 0;
          align-self: flex-start;
          margin: 0.5rem 0.5rem 0 0;
          font-size: .75rem;

          &:hover {
            opacity: 0.7 !important;
          }
        }
    
        &:hover {
          background-color: rgb(244, 244, 244);
        }
    
        &:hover .delete {
          opacity: 1;
          transform: translateX(0px);
        }
    
        .notifications-item-content {
          padding: 12px 15px 15px;
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          font-size: 13px;
          text-align: left;
    
          & small {
            font-size: 12px;
            color: #7a7a7a;
          }

          span, small {
            width: 100%;
          }
        }
      }

      .notifications-history {
        hr {
          margin: 0 auto;
        }

        .more-notifications-container {
          cursor: pointer;
          padding: .75rem;

          &:hover {
            background-color: rgb(244, 244, 244);
          }

          span {
            font-weight: bold;
            font-size: 15px;
            color: #3273dc;
          }
        }

      }

      .no-notifications {
        font-size: 14px;
        font-weight: medium;
        text-align: left;
        padding: 1rem;
        color: 	#7a7a7a;
      }
    }
  }
}

.animation-bell {
  animation-name: shakeBell;
  animation-iteration-count: infinite;
  animation-timing-function: ease-out;
  animation-duration: 5s;
}

@keyframes shakeBell {
  0% {
    transform: rotate(0deg);
  }

  2% {
    transform: rotate(-15deg);
  }

  4% {
    transform: rotate(15deg);
  }

  6% {
    transform: rotate(-15deg);
  }

  8% {
    transform: rotate(0deg);
  }

  100% {
    transform: rotate(0deg);
  }
}
</style>
