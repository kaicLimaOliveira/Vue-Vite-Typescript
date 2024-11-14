import { useFetch } from "../../composables/useFetch";
import { HttpResponse } from "../../interfaces/Http";
import { useLoadingStore } from "../../stores/loadingStore";

export function useAuthenticationService() {
  const { fetchData, error, result } = useFetch();
  const loadingStore = useLoadingStore();

  const login = async (data: object): HttpResponse<any> => {
    loadingStore.isLoading = true;
    await fetchData('post', '/auth/login', data);
    loadingStore.isLoading = false;

    return {
      error: error.value,
      result: result.value,
    };
  };

  const logout = async (): HttpResponse<any> => {
    await fetchData('post', 'logout');

    return {
      error: error.value,
      result: result.value,
    };
  };

  return {
    login,
    logout,
  };
}
