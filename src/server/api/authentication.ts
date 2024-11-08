import { useFetch } from "../../composables/useFetch";
import { HttpResponse } from "../../interfaces/Http";
import { useLoadingStore } from "../../stores/loadingStore";

class AuthenticationService {
  private fetchData: ReturnType<typeof useFetch>['fetchData'];
  private error: ReturnType<typeof useFetch>['error'];
  private result: ReturnType<typeof useFetch>['result'];
  private loadingStore = useLoadingStore();

  constructor() {
    const { fetchData, error, result } = useFetch();
    this.fetchData = fetchData;
    this.error = error;
    this.result = result;
  }

  async login(data: object): HttpResponse<any> {
    this.loadingStore.isLoading = true;
    await this.fetchData('post', 'login', data);
    this.loadingStore.isLoading = false;
  
    return {
      error: this.error,
      result: this.result,
    };
  }
  
  async logout() {
    await this.fetchData('post', 'logout');
  
    return {
      error: this.error,
      result: this.result,
    };
  }
}


export default AuthenticationService;