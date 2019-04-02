import { auth0Provider } from "@utils/auth/auth0Provider";
import { API_URL } from "@utils/env";
import axios from "axios";
import RSA from "react-simple-auth";
import { createApi } from "./swagger-gen";

let token = null;

try {
	token = RSA.getAccessToken(auth0Provider, "");
} catch (err) {}

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
