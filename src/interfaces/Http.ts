import { AxiosError } from "axios";
import { Ref } from "vue";

interface Response<T> {
  error: AxiosError<unknown, any> | null;
  result: T;
}

type HttpResponse<T> = Promise<Response<T>>;

export type {
  HttpResponse
}