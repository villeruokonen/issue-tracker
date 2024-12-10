<template>
  <div class ="login">
    <h1>Login</h1>
    <form @submit.prevent="handleLogin">
      <input v-model="username" placeholder="Username" />
      <input v-model="password" type="current-password" placeholder="Password" />
      <button type="submit">Login</button>
    </form>
  </div>
</template>

<style>
@media (min-width: 1024px) {
  .login {
    min-height: 100vh;
    display: flex;
    align-items: center;
  }
}
</style>

<script lang="ts">
import { useAuthStore } from '../stores/auth';

export default {
  data() {
    return {
      username: '',
      password: '',
    };
  },
  methods: {
    async handleLogin() {
      const authStore = useAuthStore();
      await authStore.login(this.username, this.password);
      if (authStore.isAuthenticated) {
        this.$router.push('/dashboard');
      } else {
        console.log("failed to login")
      }
    },
  },
};
</script>
