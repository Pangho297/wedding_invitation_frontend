import { instance } from "@/utils/axios-instance";
import { AxiosError, AxiosResponse, InternalAxiosRequestConfig } from "axios";

export default function useAxiosInterceptor() {
  // 요청이 전달되기 전에 작업 수행
  const onRequest = (config: InternalAxiosRequestConfig): InternalAxiosRequestConfig => {
    return config;
  };
  // 요청 오류가 있는 작업 수행
  const onRequestError = (error: AxiosError) => {
    return Promise.reject(error);
  };

  // 응답 데이터가 있는 작업 수행
  const onResponse = async (response: AxiosResponse) => {
    try {
      return response?.data || response;
    } catch (error) {
      throw error;
    }
  };

  // 응답 오류가 있는 작업 수행
  const onResponseError = async (error: any) => {
    return Promise.reject(error);
  };

  // 요청 인터셉터 추가하기
  instance.interceptors.request.use(onRequest, onRequestError);
  // 응답 인터셉터 추가하기
  instance.interceptors.response.use(onResponse, onResponseError);
}
