import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from "axios";

const api = axios.create({
  baseURL: "https://api.themoviedb.org/3/",
});

const apiKey =
  "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJkZWY5MjRhZmI3NWFjMTE1YWU2Y2Y4ZDlmYmUzMTA3ZSIsIm5iZiI6MTczMTYyOTE4Ni4zODczNTEzLCJzdWIiOiI2NzM2OGZhOGZmZTM4NzhlOWU5ZmE5NGQiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.C_Zs-FsYvTWVs5DODYKd6ARx1v282nZY2LpJ5GnBUvM";

api.interceptors.request.use((config) => {
  config.headers["Authorization"] = `Bearer ${apiKey}`;
  config.params = {
    ...config.params,
    language: "pt-BR",
  };
  return config;
});

export type IResponse<T> = [data: T, error: null] | [data: null, error: string];

class Api {
  async get<T>(path: string, config?: AxiosRequestConfig) {
    return await this.responseHandler<T>(api.get(path, config));
  }

  async post<T>(path: string, data: object) {
    return await this.responseHandler<T>(api.post(path, data));
  }

  async put<T>(path: string, data: object) {
    return await this.responseHandler<T>(api.put(path, data));
  }

  async delete<T>(path: string) {
    return await this.responseHandler<T>(api.delete(path));
  }

  async responseHandler<T>(
    fn: Promise<AxiosResponse<T>>
  ): Promise<IResponse<T>> {
    try {
      const response = await fn;
      return [response.data, null];
    } catch (error) {
      if (error instanceof AxiosError) {
        return [null, error.response?.data.message || "Something went wrong"];
      }

      if (error instanceof Error) {
        return [null, error.message];
      }

      return [null, "Something went wrong"];
    }
  }
}

const apiInstance = new Api();

export { apiInstance as api };
