
<template>
  <div class="dashboard">
    <h1>Dashboard</h1>
    <ProjectList/>
    <button @click="handleLogout">Log out</button>
  </div>
</template>

<style>
@media (min-width: 1024px) {
  .dashboard {
    min-height: 100vh;
    display: flex;
    align-items: center;
  }
}
</style>

<script lang="ts">
import ProjectList from '@/components/ProjectList.vue';
import { useAuthStore } from '../stores/auth';

export default {
  data() {
    return {
      username: '',
      password: '',
    };
  },
  methods: {
    async handleLogout() {
      const authStore = useAuthStore();
      await authStore.logout();
      this.$router.push('/');
    },
  },
  components: {
    ProjectList
  }
};
</script>
