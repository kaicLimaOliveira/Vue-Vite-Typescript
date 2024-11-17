import { useFetch } from "../../composables/useFetch";
import { HttpResponse } from "../../interfaces/Http";
import { User } from "../../interfaces/User";
import { useLoadingStore } from "../../stores/loadingStore";

export function useUserService() {
  const { fetchData, error, result } = useFetch();
  const loadingStore = useLoadingStore();

  const getUsers = async (params = ''): HttpResponse<User[]> => {
    loadingStore.isLoading = true;
    await fetchData('get', `/users/?${params}`);
    loadingStore.isLoading = false;

    return {
      error: error.value,
      result: result.value,
    };
  };

  const getUser = async (id: string): HttpResponse<User> => {
    await fetchData('get', `/users/${id}`);
    return {
      error: error.value,
      result: result.value,
    };
  };

  const createUser = async (payloadToCreate: User): HttpResponse<User> => {
    await fetchData('post', '/users', payloadToCreate);
    return {
      error: error.value,
      result: result.value,
    };
  };

  const updateUser = async (id: number | string, payloadToUpdate: User): HttpResponse<User> => {
    await fetchData('patch', `/users/${id}`, payloadToUpdate);
    return {
      error: error.value,
      result: result.value,
    };
  };

  const deleteUser = async (id: number | string): HttpResponse<User> => {
    await fetchData('delete', `/users/${id}`);
    return {
      error: error.value,
      result: result.value,
    };
  };

  return {
    getUsers,
    getUser,
    createUser,
    updateUser,
    deleteUser,
  };
}
