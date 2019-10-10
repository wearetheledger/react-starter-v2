// tslint:disable: function-name

import { authRequest } from "./request";

export interface Form {
	_id: string;
	name: string;
	title: string;
	steps: Todo[];
}

export class FormService {
	public static async GetAllForms() {
		return authRequest<Form[]>({
			url: `/forms`,
			method: "GET"
		});
	}

	public static async GetFormById(id: string) {
		return authRequest<Form[]>({
			url: `/forms/${id}`,
			method: "GET"
		});
	}
}
