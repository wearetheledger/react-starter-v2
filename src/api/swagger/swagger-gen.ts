import { AxiosPromise, AxiosInstance, AxiosRequestConfig, AxiosResponse } from "axios";
import Axios from "axios";

function setParam(distObject: any, key: string, param: any) {
	if (param !== undefined) distObject[key] = param;
}

export function createApi(
	axios: AxiosInstance = Axios.create({
		baseURL: ""
	})
): ApiInstance {
	return {
		$axios: axios,
		app: {
			/**
			 *
			 * @method
			 */
			getIndex(config) {
				let path = `/`;
				let queryParams: any = {};
				let data: any = {};

				return axios.request({
					url: path,
					method: "GET",
					params: queryParams,
					data: data,
					...config
				});
			},

			$getIndex(config) {
				return this.getIndex(config).then(res => res && res.data);
			},
			/**
			 *
			 * @method
			 */
			postIndex(config) {
				let path = `/`;
				let queryParams: any = {};
				let data: any = {};

				return axios.request({
					url: path,
					method: "POST",
					params: queryParams,
					data: data,
					...config
				});
			},

			$postIndex(config) {
				return this.postIndex(config).then(res => res && res.data);
			}
		}
	};
}

interface Core {
	$axios: AxiosInstance;
}

export interface ApiInstance extends Core {
	app: {
		getIndex(config?: AxiosRequestConfig): AxiosPromise<object>;
		$getIndex(config?: AxiosRequestConfig): Promise<object>;
		postIndex(config?: AxiosRequestConfig): AxiosPromise<object>;
		$postIndex(config?: AxiosRequestConfig): Promise<object>;
	};
}
