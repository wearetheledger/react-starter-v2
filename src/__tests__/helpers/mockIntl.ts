// tslint:disable-next-line: prefer-type-cast
export const mockIntl: ReactIntl.InjectedIntl = {
	// tslint:disable-next-line: no-any
	formatMessage: ({ defaultMessage }: any) => defaultMessage
	// tslint:disable-next-line: no-any
} as any;
