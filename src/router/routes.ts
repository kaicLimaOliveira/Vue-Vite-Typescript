import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';

declare module 'vue-router' {
  interface RouteMeta {
    requiresAuth: boolean;
    translatedName: string;
    icon?: string | string[];
    layout?: () => Promise<any>
  }
}


const routes: RouteRecordRaw[] = [
  {
    path: "/",
    name: "Home",
    component: () => import("../views/private/index.vue"),
    meta: {
      requiresAuth: true,
      translatedName: 'Home',
      layout: () => import("../layouts/side-nav-layout.vue")
    },
  },
  {
    path: "/usuarios",
    name: "Users",
    component: () => import("../views/private/users.vue"),
    meta: {
      requiresAuth: true,
      translatedName: 'Usuários',
      icon: 'user',
      layout: () => import("../layouts/side-nav-layout.vue")
    },
  },
  {
    path: "/historico-notificacoes",
    name: "NotificationsHistory",
    component: () => import("../views/private/notifications.vue"),
    meta: {
      requiresAuth: true,
      translatedName: 'Histórico de notificações',
      layout: () => import("../layouts/side-nav-layout.vue")
    },
  },
  {
    path: "/login",
    name: "Login",
    component: () => import("../views/public/login.vue"),
    meta: {
      requiresAuth: false,
      translatedName: 'Login',
      layout: () => import("../layouts/login-layout.vue")
    },
  },
  {
    path: "/recuperacao-de-senha",
    name: "ForgottenPassword",
    component: () => import("../views/public/forgotten-password.vue"),
    meta: {
      requiresAuth: false,
      translatedName: 'Recuperação de senha',
      layout: () => import("../layouts/login-layout.vue")
    },
  },
  {
    path: '/:catchAll(.*)*',
    name: 'NotFound',
    component: () => import("../views/public/not-found.vue"),
    meta: {
      requiresAuth: false,
      translatedName: 'Não encontrado'
    }
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
