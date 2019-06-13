import { auth0Provider } from "@utils/auth/auth0Provider";
import { API_URL } from "@utils/env";
import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from "axios";
import RSA from "react-simple-auth";

const authHeader: AxiosRequestConfig["headers"] = {};

try {
	authHeader.Authorization = `Bearer ${RSA.getAccessToken(auth0Provider, "")}`;
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
