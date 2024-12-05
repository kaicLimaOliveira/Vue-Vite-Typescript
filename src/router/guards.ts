import router from "./routes"
import { useAuthStore } from '../stores/authStore';

router.beforeEach(async (to, from) => {
  if (to.name === from.name) return
  
  document.title = to.meta.translatedName
  const authStore = useAuthStore()

  // if (to.meta.requiresAuth && !authStore.isLoggedIn) {
  //   authStore.isLoggedIn = true
  // }
})