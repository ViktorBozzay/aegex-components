type FormFieldProps = Omit<FormField, 'value'>;

export type FormStoreData = {
	formFieldProps: FormFieldProps[];
	values: { [key: string]: unknown };
	initialValues: { [key: string]: unknown };
	touched: { [key: string]: boolean };
	errors: { [key: string]: string };
};
