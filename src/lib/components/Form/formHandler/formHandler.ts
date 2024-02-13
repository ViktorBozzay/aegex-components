import { writable } from 'svelte/store';

import type { FormField } from '../types/FormFields.js';
import type { FormStoreData } from '../types/FormStoreData.js';

export const createFormHandler = (formFields: FormField[]) => {
	const initForm: FormStoreData = formFields.reduce(
		(acc: FormStoreData, formField: FormField) => {
			const { value, ...fieldProps } = formField;
			return {
				...acc,
				formFieldProps: [...acc.formFieldProps, fieldProps],
				initialValues: {
					...acc.initialValues,
					[fieldProps.name]: value || ''
				},
				values: {
					...acc.values,
					[fieldProps.name]: value || ''
				},
				touched: {
					...acc.touched,
					[fieldProps.name]: false
				},
				errors: {
					...acc.errors,
					[fieldProps.name]: ''
				}
			};
		},
		{ initialValues: {}, values: {}, touched: {}, errors: {}, formFieldProps: [] }
	);

	const formStore = writable<FormStoreData>(initForm);

	// TODO: is it good for now, find a better way to use type here
	const handleField = (e: InputEvent | CustomEvent) => {
		const { value, name } = (e.target as HTMLInputElement) ?? e.detail;

		// console.log('handleField', e, value, name);
		formStore.update((store) => ({
			...store,
			values: {
				...store.values,
				[name]: value
			}
		}));
	};

	const setValues = (values: { [key: string]: unknown }) => {
		formStore.update((store) => ({
			...store,
			values: { ...store.values, ...values }
		}));
	};

	const resetForm = () => {
		formStore.update((store) => ({
			...store,
			values: { ...store.initialValues },
			touched: {},
			errors: {}
		}));
	};

	return {
		form: { subscribe: formStore.subscribe },
		handleField,
		setValues,
		resetForm
	};
};
