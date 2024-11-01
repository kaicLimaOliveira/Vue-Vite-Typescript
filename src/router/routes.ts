import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';

declare module 'vue-router' {
  interface RouteMeta {
    enableNav: boolean;
    translatedName: string;
    icon?: string | string[];
  }
}


const routes: RouteRecordRaw[] = [
  {
    path: "/",
    name: "Home",
    component: () => import("../views/index.vue"),
    meta: {
      enableNav: true,
      translatedName: 'Home',
    },
  },
  {
    path: "/usuarios",
    name: "Users",
    component: () => import("../views/users.vue"),
    meta: {
      enableNav: true,
      translatedName: 'Usuários',
      icon: 'user'
    },
  },
  {
    path: "/historico-notificacoes",
    name: "NotificationsHistory",
    component: () => import("../views/notifications.vue"),
    meta: {
      enableNav: true,
      translatedName: 'Usuários',
      icon: 'user'
    },
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach(async (to, from) => {
  if (to.name === from.name) return
  document.title = to.meta.translatedName
})


export default router;
