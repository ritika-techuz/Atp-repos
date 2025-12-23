import axios from 'axios';
import { getData } from '@/shared/utils/helper';
import { CONSTANT } from '@/shared/utils/constant';
import { ROUTES } from '../utils/routes';

const baseUrl = (import.meta as any).env.VITE_API_BASE_URL;
type headerType = { [key: string]: string; };
const defaultHeaders = { 'Content-Type': 'application/json', };

axios.interceptors.request.use(async (config) => {
	const token = getData(CONSTANT.ACCESS_TOKEN);
	if (token) config.headers.authorization = `Bearer ${token}`;
	config.baseURL = baseUrl;
	config.headers['Access-Control-Allow-Origin'] = '*';
	return config;
}, (error) => {
	return Promise.reject(error);
});

axios.interceptors.response.use((response) => response?.data,
	(error) => {
		if (error.response && error.response.status === 401) {
			localStorage.clear();
			window.location.replace(ROUTES.login);
		}
		throw error?.response?.data;
	}
);

export const httpServices = {
	getData: async (reqUrl: string, params = {}) => {
		const response = await axios.get(reqUrl, { params });
		return response;
	},
	postData: async (reqUrl: string, data = {}, headers?: headerType) => {
		const response = await axios.post(reqUrl, data, { headers: { ...defaultHeaders, ...headers } });
		return response;
	},
	putData: async (reqUrl: string, data = {}, headers?: headerType) => {
		const response = await axios.put(reqUrl, data, { headers: { ...defaultHeaders, ...headers } });
		return response;
	},
	patchData: async (reqUrl: string, data = {}, headers?: headerType) => {
		const response = await axios.patch(reqUrl, data, { headers: { ...defaultHeaders, ...headers } });
		return response;
	},
	deleteData: async (reqUrl: string, params = {}) => {
		const response = await axios.delete(reqUrl, params);
		return response;
	}
}