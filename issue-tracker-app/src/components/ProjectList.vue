<template>
  <div class="project-list">
    <h1>Projects</h1>
    <div v-if="loading">Loading projects...</div>
    <div v-else>
      <div v-for="project in projects" :key="project.id" class="project">
        <h2 @click="toggleExpansion(project.id)">
          {{ project.name }} ({{ project.expanded ? 'Collapse' : 'Expand' }})
        </h2>
        <ul v-if="project.expanded">
          <li v-if="project.issues.length === 0">Loading issues...</li>
          <li v-for="issue in project.issues" :key="issue.id">
            <strong>{{ issue.title }}</strong> - {{ issue.status }}
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<style scoped>
h1 {
  font-weight: 500;
  font-size: 2.6rem;
  position: relative;
  top: -10px;
}

h3 {
  font-size: 1.2rem;
}

.landing h1,
.landing h3 {
  text-align: center;
}

@media (min-width: 1024px) {
  .landing h1,
  .landing h3 {
    text-align: left;
  }
}
</style>

<script lang="ts">
import { useProjectsStore } from '@/stores/projects';
import { computed, onMounted } from 'vue';

export default {
  setup() {
    const projectsStore = useProjectsStore();

    onMounted(() => {
      projectsStore.fetchProjects();
    })

    const projects = computed(() => projectsStore.projects);
    const loading = computed(() => projectsStore.loading);
    const toggleExpansion = ((projectId: number) => {
      projectsStore.toggleProjectExpansion(projectId);

      if (projectsStore.projects.find(p => p.id === projectId)?.issues.length == 0) {
        projectsStore.fetchIssues(projectId);
      }
    });

    return {
      projects,
      loading,
      toggleExpansion
    };
  },
}
</script>
