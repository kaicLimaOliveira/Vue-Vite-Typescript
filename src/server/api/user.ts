import { useFetch } from "../../composables/useFetch";
import { HttpResponse } from "../../interfaces/Http";
import { User } from "../../interfaces/User";
import { useLoadingStore } from "../../stores/loadingStore";


class UserService {
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

  async getUsers(params = ''): HttpResponse<User[]> {
    this.loadingStore.isLoading = true;
    await this.fetchData('get', `/users?${params}`);
    this.loadingStore.isLoading = false;
  
    return {
      error: this.error,
      result: this.result,
    };
  }
  
  async getUser(id: string): HttpResponse<User> {
    await this.fetchData('get', `/users/${id}`);
    return {
      error: this.error,
      result: this.result,
    };
  }
  
  async createUser(payloadToCreate: User): HttpResponse<User> {
    await this.fetchData('post', '/users', payloadToCreate);
    return {
      error: this.error,
      result: this.result,
    };
  }
  
  async updateUser(id: string, payloadToUpdate: User): HttpResponse<User> {
    await this.fetchData('patch', `/users/${id}`, payloadToUpdate);
    return {
      error: this.error,
      result: this.result,
    };
  }
  
  async deleteUser(id: string): HttpResponse<User> {
    await this.fetchData('delete', `/users/${id}`);
    return {
      error: this.error,
      result: this.result,
    };
  }
}

export default UserService;