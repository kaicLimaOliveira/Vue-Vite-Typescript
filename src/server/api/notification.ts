import { useFetch } from "../../composables/useFetch";
import { HttpResponse } from "../../interfaces/Http";
import { useLoadingStore } from "../../stores/loadingStore";

class NotificationService {
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

  async getNotifications(params: string = ''): HttpResponse<Notification> {
    this.loadingStore.isLoading = true;
    await this.fetchData('get', `notifications/?${params}`);
    this.loadingStore.isLoading = false;
  
    return {
      error: this.error,
      result: this.result,
    };
  }
  
  async updateNotificationAsSeen(id: number, data: object) {
    await this.fetchData('patch', `notifications/${id}/seen/`, data);
  
    return {
      error: this.error,
      result: this.result,
    };
  }
}


export default NotificationService;