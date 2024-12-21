import { useFetch } from "../../composables/useFetch";
import { HttpResponse } from "../../interfaces/Http";
import { useLoadingStore } from "../../stores/loadingStore";

export function useAuthorizationService() {
  const { fetchData, error, result } = useFetch();
  const loadingStore = useLoadingStore();

  const requiresAuth = async (): HttpResponse<any> => {
    loadingStore.isLoading = true;
    await fetchData('get', '');
    loadingStore.isLoading = false;

    return {
      result: result.value,
      error: error.value,
    }
  };


  return {
    requiresAuth,
  };
}
