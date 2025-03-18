import axios, { AxiosRequestConfig } from 'axios'

const config: AxiosRequestConfig = {
  baseURL: import.meta.env.VITE_NEST_API_URL
}

export const api = axios.create(config)
