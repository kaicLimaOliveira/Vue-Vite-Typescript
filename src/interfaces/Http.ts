import { AxiosError } from "axios";
import { Ref } from "vue";

interface Response<T> {
  error: Ref<AxiosError<unknown, any> | null, AxiosError<unknown, any> | null>;
  result: Ref<T>;
}

type HttpResponse<T> = Promise<Response<T>>;

export type {
  HttpResponse
}