import { AxiosError } from "axios";

interface Response<T> {
  error: AxiosError<unknown, any> | null;
  result: T;
}

type HttpResponse<T> = Promise<Response<T>>;

export type {
  HttpResponse
}