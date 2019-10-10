// tslint:disable: function-name

import { authRequest } from "./request";
import { Form } from "./formService";

export interface Application {
	_id: string;
	form: Form;
}

export class ApplicationService {
	public static async GetAllApplications() {
		return authRequest<Application[]>({
			url: `/applications`,
			method: "GET"
		});
	}

	public static async GetApplicationById(id: string) {
		return authRequest<Application>({
			url: `/applications/${id}`,
			method: "GET"
		});
	}
}
