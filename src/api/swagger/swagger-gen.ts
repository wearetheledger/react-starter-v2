import { AxiosPromise, AxiosInstance, AxiosRequestConfig } from "axios";
import Axios from "axios";

export interface MyAsset {
	value: string;
}
export interface MyAssetCreateDto {
	id?: string;
	value: string;
}
export interface TxResponse {
	transactionId: string;
	status: string;
	blockNumber: number;
}
export interface MyAssetDto {
	value: string;
}
function setParam(distObject: any, key: string, param: any) {
	if (param !== undefined) distObject[key] = param;
}

export function createApi(axios: AxiosInstance = Axios.create({ baseURL: "" })): ApiInstance {
	return {
		$axios: axios,
		myAsset: {
			/**
			 * Find an asset by id
			 * @method
			 * @param { object } config
			 * @param id -  */
			getMyAssetById(id, config) {
				let path = `/my-asset/${id}`;
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

			$getMyAssetById(id, config) {
				return this.getMyAssetById(id, config).then(res => res && res.data);
			},
			/**
			 * Update asset
			 * @method
			 * @param { object } parameters
			 * @param { object } config
			 * @param { MyAssetDto }parameters.myAssetDto -
			 * @param { string }parameters.id -
			 */ putMyAssetById(parameters, config) {
				let path = `/my-asset/${parameters.id}`;
				let queryParams: any = {};
				let data: any = {};

				data = parameters["myAssetDto"];

				return axios.request({
					url: path,
					method: "PUT",
					params: queryParams,
					data: data,
					...config
				});
			},

			$putMyAssetById(parameters, config) {
				return this.putMyAssetById(parameters, config).then(res => res && res.data);
			},
			/**
			 * Delete asset
			 * @method
			 * @param { object } config
			 * @param id -  */ deleteMyAssetById(id, config) {
				let path = `/my-asset/${id}`;
				let queryParams: any = {};
				let data: any = {};

				return axios.request({
					url: path,
					method: "DELETE",
					params: queryParams,
					data: data,
					...config
				});
			},

			$deleteMyAssetById(id, config) {
				return this.deleteMyAssetById(id, config).then(res => res && res.data);
			},
			/**
			 * Create new asset
			 * @method
			 * @param { object } config
			 * @param myAssetCreateDto -  */ postMyAsset(myAssetCreateDto, config) {
				let path = `/my-asset`;
				let queryParams: any = {};
				let data: any = {};

				data = myAssetCreateDto;

				return axios.request({
					url: path,
					method: "POST",
					params: queryParams,
					data: data,
					...config
				});
			},

			$postMyAsset(myAssetCreateDto, config) {
				return this.postMyAsset(myAssetCreateDto, config).then(res => res && res.data);
			}
		},
		auth: {
			/**
			 *
			 * @method
			 * @param { object } config
			 */
			getAuthAuth0(config) {
				let path = `/auth/auth0`;
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

			$getAuthAuth0(config) {
				return this.getAuthAuth0(config).then(res => res && res.data);
			},
			/**
			 *
			 * @method
			 * @param { object } config
			 */ getAuthAuth0Callback(config) {
				let path = `/auth/auth0/callback`;
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

			$getAuthAuth0Callback(config) {
				return this.getAuthAuth0Callback(config).then(res => res && res.data);
			}
		}
	};
}

interface Core {
	$axios: AxiosInstance;
}

interface myAssetResource {
	getMyAssetById(id: string, config?: AxiosRequestConfig): AxiosPromise<MyAsset>;
	$getMyAssetById(id: string, config?: AxiosRequestConfig): Promise<MyAsset>;
	putMyAssetById(
		parameters: {
			myAssetDto: MyAssetDto;
			id: string;
		},
		config?: AxiosRequestConfig
	): AxiosPromise<TxResponse>;
	$putMyAssetById(
		parameters: {
			myAssetDto: MyAssetDto;
			id: string;
		},
		config?: AxiosRequestConfig
	): Promise<TxResponse>;
	deleteMyAssetById(id: string, config?: AxiosRequestConfig): AxiosPromise<TxResponse>;
	$deleteMyAssetById(id: string, config?: AxiosRequestConfig): Promise<TxResponse>;
	postMyAsset(
		myAssetCreateDto: MyAssetCreateDto,
		config?: AxiosRequestConfig
	): AxiosPromise<TxResponse>;
	$postMyAsset(
		myAssetCreateDto: MyAssetCreateDto,
		config?: AxiosRequestConfig
	): Promise<TxResponse>;
}
interface authResource {
	getAuthAuth0(config?: AxiosRequestConfig): AxiosPromise<object>;
	$getAuthAuth0(config?: AxiosRequestConfig): Promise<object>;
	getAuthAuth0Callback(config?: AxiosRequestConfig): AxiosPromise<object>;
	$getAuthAuth0Callback(config?: AxiosRequestConfig): Promise<object>;
}

export interface ApiInstance extends Core {
	myAsset: myAssetResource;
	auth: authResource;
}
