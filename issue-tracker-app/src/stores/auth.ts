import { defineStore } from "pinia";
import apiClient from "../services/axios";
import { AxiosError } from "axios";

interface User {
  id: number;
  username: string;
}

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
}

interface LoginResponse {
  success: boolean,
  user: {
    id: number,
    username: string,
    token: string
  };
}

export const useAuthStore = defineStore('auth',
  {
    state: (): AuthState => ({
      user: null,
      isAuthenticated: false
    }),
    actions: {
      async login(username: string, password: string): Promise<void> {
        try {
          console.log("Logging in...");
          const response = await apiClient.post<LoginResponse>('/api/auth/login', { username, password }, { withCredentials: true });

          if (response.data.success) {
            const { user } = response.data;
            console.log (`Login success. Welcome, ${user.username}`);
            localStorage.setItem("authToken", user.token);
            this.user = user;
            this.isAuthenticated = true;
          } else {
            console.error("Login failed. Unexpected response.");
          }

        } catch (error: unknown) {
          if (error instanceof AxiosError) {
             console.log(error.response?.data?.message || "login fail")
          }
        }
      },
      async fetchProfile(): Promise<void> {
        try {
          const response = await apiClient.get('/api/auth/session');
          this.user = response.data.user;
          this.isAuthenticated = this.user != null;
        } catch (error: unknown) {
          if (error instanceof AxiosError) {
            console.log(error.response?.data?.message || "fetch fail");
         }
          this.user = null;
          this.isAuthenticated = false;
        }
      },
      async logout(): Promise<void> {
        await apiClient.post('/api/auth/logout');
        localStorage.removeItem("authToken");
        this.user = null;
        this.isAuthenticated = false;
      }
    }
  });
