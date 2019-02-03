import { ChainService } from "@api/swagger-gen";
import { auth0Provider } from "@utils/auth/auth0Provider";
import { API_URL } from "@utils/env";
import RSA from "react-simple-auth";

export const APIService = new ChainService(API_URL);

APIService.setRequestHeadersHandler(headers => {
	const token = RSA.getAccessToken(auth0Provider, "");
	if (token) {
		return {
			...headers,
			Authorization: `Bearer ${token}`
		};
    }
    
	return headers;
});
