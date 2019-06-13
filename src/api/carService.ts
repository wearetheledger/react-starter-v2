// tslint:disable: function-name

import { authRequest } from "./request";

export interface Car {
	model: string;
}

export class CarService {
	public static async GetCars() {
		return authRequest<Car>({
			url: `/cars`,
			method: "GET"
		});
	}
}
