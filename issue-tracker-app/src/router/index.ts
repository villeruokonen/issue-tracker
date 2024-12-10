import { createRouter, createWebHistory } from 'vue-router';
import { useAuthStore } from '../stores/auth';
import LandingView from '../views/LandingView.vue';
import DashboardView from '../views/DashboardView.vue';
import LoginView from '../views/LoginView.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'landing',
      component: LandingView,
    },
    {
      path: "/dashboard",
      name: "dashboard",
      component: DashboardView,
      meta: { requiresAuth: true}
    },
    {
      path: "/login",
      name: "login",
      component: LoginView
    }
  ],
})

router.beforeEach(async (to, from, next) => {
  const authStore = useAuthStore();
  if (to.meta.requiresAuth && !authStore.isAuthenticated) {
    console.log("Authentication required.")
    await authStore.fetchProfile(); // try auth

    if (!authStore.isAuthenticated) { // if auth fails, goto login
      console.log("Was not authenticated.")
      return next('/login');
    }
    else console.log("Authenticated");
  }

  next();
});

export default router
