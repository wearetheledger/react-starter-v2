import { AuthService } from "@utils/auth/authService";
import { API_URL } from "@utils/env";
import axios from "axios";
import { createApi } from "./swagger-gen";

const token = AuthService.getJwt();

// tslint:disable-next-line: no-any
const headers: any = {};

if (token) {
	headers.Authorization = `Bearer ${token}`;
}

const httpClient = axios.create({
	baseURL: API_URL,
	headers
});

export const APIService = createApi(httpClient);
