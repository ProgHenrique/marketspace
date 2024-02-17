import axios from 'axios';
import { parseCookies } from "nookies";

const { 'marketspace.token': token } = parseCookies()
// inicialize axios to call api
export const api = axios.create({
  baseURL: '/api',
})

if(token) {
  api.defaults.headers['Authorization'] = `Bearer ${token}`
}