import { useMutation } from "@tanstack/react-query";
import { AuthData, AuthResponse, NewTask, Task, UpdateTask } from "../axios/apiTypes";
import { delTask, newTask, startLogin, startRegistration, updTask } from "../axios/api";
import { invalidateAll } from "./onSuccess";
import { loadToken, saveTokens } from "../secureStore";
import { useUserStore } from "../../src/entities/ZustandStores/store";

export const useLogin = () => {
  const { setAuthenticated } = useUserStore();
 
  return useMutation({
    mutationFn: (data: AuthData) => startLogin(data),
    onSuccess: async (data: AuthResponse) => {
      if (data.accessToken && data.refreshToken) {
        await saveTokens(data.accessToken, data.refreshToken);
        setAuthenticated(true);
      } else {
        console.warn("В ответе сервера отсутствует один из токенов");
      }
    },
    onError: (error) => {
      console.error("Login failed:", error);
    },
  });
};
 
export const useRegistration = () => {
  const { setAuthenticated } = useUserStore();
 
  return useMutation({
    mutationFn: (data: AuthData) => startRegistration(data),
    onSuccess: async (data: AuthResponse) => {
      if (data.accessToken && data.refreshToken) {
        await saveTokens(data.accessToken, data.refreshToken);
        setAuthenticated(true);
      } else {
        console.warn("В ответе сервера отсутствует один из токенов");
      }
    },
    onError: (error) => {
      console.error("Registration failed:", error);
    },
  });
};

//Tasks 
export const useNewTask = () => {
  return useMutation({
    mutationFn: (data: NewTask) => newTask(data),
    onSuccess: ()=> {invalidateAll(); console.log("Таска создана")},
  });
};
//Tasks 
export const useUpdTask = () => {
  return useMutation({
    mutationFn: (data: UpdateTask) => updTask(data),
    onSuccess: ()=> {invalidateAll(); console.log("Таска изменена")},
  });
};
export const useDelTask = () => {
  return useMutation({
    mutationFn: (taskId: number) => delTask(taskId),
    onSuccess: ()=> {invalidateAll(); console.log("Таска удалена")},
  });
};
