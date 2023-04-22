import axios, { AxiosRequestConfig } from "axios";
import ExternalDependencyError from "../../errors/ExternalDependencyError";

export default class AxiosService {
  private axios = axios;
  private timeOut = 20000;
  private defaultError = {
    message: "could not successfully complete request to an external server",
    useAsDefault: true,
  };
  private headers = {};

  constructor(private baseUrl: string) {}

  get requestInstance() {
    const instance = this.axios.create({
      baseURL: this.baseUrl,
      timeout: this.timeOut,
      headers: this.headers,
    });
    instance.interceptors.request.use((config) => {
      const { url, method, baseURL, data } = config;
      console.log(
        `HTTPService: ${method!.toUpperCase()} ==> ${baseURL}${url} >>> [DATA]: `,
        data
      );
      return config;
    });
    return instance;
  }

  setHeaders(headers: object) {
    this.headers = headers;
    return this;
  }

  setHeader(headers: object) {
    this.headers = { ...this.headers, ...headers };
    return this;
  }

  setAuthHeader(authData: string) {
    this.setHeader({ Authorization: authData });
    return this;
  }

  async get(url: string, options: AxiosRequestConfig<object>) {
    return await this._handleRequest(this.requestInstance.get(url, options));
  }

  async post(url: string, data: object, options: AxiosRequestConfig<object>) {
    return await this._handleRequest(
      this.requestInstance.post(url, data, options)
    );
  }

  async update(url: string, data: object, options: AxiosRequestConfig<object>) {
    return await this._handleRequest(
      this.requestInstance.put(url, data, options)
    );
  }

  async delete(url: string, options: AxiosRequestConfig<object>) {
    return await this._handleRequest(this.requestInstance.delete(url, options));
  }

  async _handleRequest(requestPromise: Promise<any>) {
    try {
      const response = await Promise.resolve(requestPromise);
      return response.data;
    } catch (e: any) {
      if (e?.response?.data.success === false) {
        return e.response.data;
      }
      let message = this.defaultError.message;
      if (e.response) {
        console.log(e);
        if (e.isAxiosError && this.defaultError.useAsDefault) {
          message = e.response?.data ?? e.response ?? message;
        }
      }

      throw new ExternalDependencyError(message);
    }
  }
}
