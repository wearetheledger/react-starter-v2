import { AuthService } from "@utils/auth/authService";
import { API_URL } from "@utils/env";
import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from "axios";

const authHeader: AxiosRequestConfig["headers"] = {};

try {
	const token = AuthService.getJwt();

	if (token) {
		authHeader.Authorization = `Bearer ${token}`;
	}
} catch (err) {}

/**
 * Create an Axios Client with defaults
 */
const client = axios.create({
	baseURL: API_URL
});

/**
 * Request Wrapper with default success/error actions
 */
// tslint:disable-next-line: no-any
export const request = async <T = any>(options: AxiosRequestConfig) => {
	const onSuccess = (response: AxiosResponse<T>) => {
		return response.data;
	};

	const onError = async (error: AxiosError) => {
		return Promise.reject(error.response || error.message);
	};

	return client
		.request<T>(options)
		.then(onSuccess)
		.catch(onError);
};

export const authRequest = async <T>(options: AxiosRequestConfig) => {
	return request<T>({
		...options,
		headers: {
			...options.headers,
			...authHeader
		}
	});
};
