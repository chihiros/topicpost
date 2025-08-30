import { Configuration, UserApi } from "./generated";

const BASE_PATH = typeof window !== 'undefined' 
  ? 'http://localhost:8686' // ブラウザから直接アクセス
  : (process.env.VITE_API_BASE_URL || 'http://localhost:8686'); // サーバーサイド（Docker内）
const API_VERSION = 'v1'; // APIのバージョン

const config = (baseURL: string) => new Configuration({
  basePath: baseURL,
})

export const userApi = new UserApi(config(BASE_PATH + '/' + API_VERSION));
