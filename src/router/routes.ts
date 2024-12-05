import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';

declare module 'vue-router' {
  interface RouteMeta {
    requiresAuth: boolean;
    translatedName: string;
    icon?: string | string[];
    layout?: {
      component: () => Promise<any>;
      props?: Record<string, any>
    }
  }
}


const routes: RouteRecordRaw[] = [
  {
    path: "/",
    name: "Home",
    component: () => import("../views/index.vue"),
    meta: {
      requiresAuth: true,
      translatedName: 'Home',
      layout: {
        component: () => import("../layouts/side-nav-layout.vue"),
      }
    },
  },
  {
    path: "/usuarios",
    name: "Users",
    component: () => import("../views/users.vue"),
    meta: {
      requiresAuth: true,
      translatedName: 'Usuários',
      icon: 'user',
      layout: {
        component: () => import("../layouts/side-nav-layout.vue"),
      }
    },
  },
  {
    path: "/historico-notificacoes",
    name: "NotificationsHistory",
    component: () => import("../views/notifications.vue"),
    meta: {
      requiresAuth: true,
      translatedName: 'Histórico de notificações',
      layout: {
        component: () => import("../layouts/side-nav-layout.vue"),
      }
    },
  },
  {
    path: "/login",
    name: "Login",
    component: () => import("../views/login.vue"),
    meta: {
      requiresAuth: false,
      translatedName: 'Login',
      layout: {
        component: () => import("../layouts/login-layout.vue")
      }
    },
  },
  {
    path: "/recuperacao-de-senha",
    name: "ForgottenPassword",
    component: () => import("../views/forgotten-password.vue"),
    meta: {
      requiresAuth: false,
      translatedName: 'Recuperação de senha',
      layout: {
        component: () => import("../layouts/login-layout.vue")
      }
    },
  },
  {
    path: '/:catchAll(.*)*',
    name: 'NotFound',
    component: () => import("../views/not-found.vue"),
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
