import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
import { useAuthStore } from '../stores/authStore';

declare module 'vue-router' {
  interface RouteMeta {
    requiresAuth: boolean;
    enableNav: boolean;
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
      enableNav: true,
      translatedName: 'Home',
    },
  },
  {
    path: "/usuarios",
    name: "Users",
    component: () => import("../views/users.vue"),
    meta: {
      requiresAuth: true,
      enableNav: true,
      translatedName: 'Usuários',
      icon: 'user',
    },
  },
  {
    path: "/historico-notificacoes",
    name: "NotificationsHistory",
    component: () => import("../views/notifications.vue"),
    meta: {
      requiresAuth: true,
      enableNav: true,
      translatedName: 'Histórico de notificações'
    },
  },
  {
    path: "/login",
    name: "Login",
    component: () => import("../views/login.vue"),
    meta: {
      requiresAuth: false,
      enableNav: false,
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
      enableNav: false,
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
      enableNav: false,
      translatedName: 'Não encontrado'
    }
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach(async (to, from) => {
  if (to.name === from.name) return
  document.title = to.meta.translatedName
  const authStore = useAuthStore()

  // if (to.meta.requiresAuth && !authStore.isLoggedIn) {
  //   authStore.isLoggedIn = true
  // }
})


export default router;
