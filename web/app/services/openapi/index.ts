import { Configuration, UserApi } from "./generated";

const BASE_PATH = 'http://localhost:8686'; // APIのエンドポイント
const API_VERSION = 'v1'; // APIのバージョン

const config = (baseURL: string) => new Configuration({
  basePath: baseURL,
})

export const userApi = new UserApi(config(BASE_PATH + '/' + API_VERSION));
