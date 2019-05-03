import { WrappedFormUtils } from "antd/lib/form/Form";

// tslint:disable-next-line: prefer-type-cast no-any
export const mockForm: WrappedFormUtils = {
	// tslint:disable-next-line: no-any
	getFieldDecorator: jest.fn(opts => (c: any) => c)
	// tslint:disable-next-line: no-any
} as any;
