import { defineStore } from "pinia";
import apiClient from "@/services/axios";
import { AxiosError } from "axios";

interface Issue {
  id: number;
  title: string;
  status: string;
}

interface Project {
  id: number;
  name: string;
  issues: Array<Issue>;
  expanded: boolean;
};

export const useProjectsStore = defineStore('projects', {
  state: () => ({
    projects: [] as Array<Project>,
    loading: false,
    error: null as string | null,
  }),

  actions: {
    async fetchProjects() {
      this.loading = true;
      this.error = null;

      try {
        const response = await apiClient.get<Array<Project>>('/api/projects/');
        this.projects = response.data.map((project) => ({
          ...project,
          name: project.name,
          issues: [],
        }));
      } catch (err: unknown) {
        if (err instanceof AxiosError) {
          this.error = "Failed to fetch projects"
          console.error(err);
        }
      } finally {
        this.loading = false;
      }
    },

    async fetchIssues(projectId: number) {
      const project = this.projects.find(p => p.id === projectId);
      if (project && project.issues.length == 0) {
        try {
          const response = await apiClient.get<Array<Issue>>(`/api/projects/${projectId}/issues`);
          project.issues = response.data;
        } catch (err: unknown) {
          if (err instanceof AxiosError) {
            this.error = `Failed to fetch issues for project ${projectId}`;
            console.error(err);
          }
        }
      }
    },

    toggleProjectExpansion(projectId: number) {
      const project = this.projects.find(p => p.id === projectId);
      if (project) project.expanded = !project.expanded;
    }
  }
});
