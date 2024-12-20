import { ref } from 'vue';
import axios, { AxiosError } from 'axios';


export function useFetch(baseURL: string = import.meta.env.VITE_API_URL) {
  const result = ref();            
  const loading = ref(false);            
  const error = ref<AxiosError | null>(null);        

	const api = axios.create({
		baseURL,
		headers: {
			Accept: "application/json",
			'Content-Type': "application/json",
		},
	})

  const fetchData = async (method: string, url: string, data?: object, contentType = 'application/json') => {
    error.value = null;
    loading.value = true;

    try {
      const response = await api.request({
        method,
        url,
        data,
        headers: {
          'Content-Type': contentType,
        }
      });

      result.value = response.data;

    } catch (err) {
			const axiosError = err as AxiosError;
      error.value = axiosError;

    } finally {
      loading.value = false;
    }
  };

  return {
    result,
    error,
    loading,
    fetchData,
  };
}