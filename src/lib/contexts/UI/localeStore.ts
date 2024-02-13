import { writable, get } from 'svelte/store';
import { page } from '$app/stores';

import type { DictRecord } from './types/DictRecord';
import type { Dictionary } from './types/Dictionary';
import type { Languages } from 'Languages';
import { languages } from '$lib/constants/languages';
import { getNextFromArray } from '$lib/utils/getNextFromArray';
import { localizationKey } from '$lib/constants/cookieKeys';
import { cookie } from '$lib/utils/cookie';

const createLocaleStore = () => {
  const t = (key: string) => {
		const store = get(localizationStore);
		const { dictionaries, currentPage, lang } = store;

		const value = dictionaries?.[currentPage]?.[lang]?.[key];

		if (!value)
			console.error(
				`Translation is missing for page: ${get(localizationStore).currentPage}, key: ${key}`
			);

		return value ?? key;
	};

	const tc = (component?: string, key?: string) => {
		if (!component || !key) return key;

		const store = get(localizationStore);
		const { dictionaries, lang } = store;

		const value = dictionaries?.[component]?.[lang]?.[key];

		if (!value) console.error(`Translation is missing for component: ${component}, key: ${key}`);

		return value ?? key;
	};

	const localizationStore = writable({
		lang: 'en' as Languages,
		currentPage: '',
		dictionaries: {} as Dictionary,
		t,
		tc
	});

	const initLang = (newDictionary: Record<string, DictRecord>) => {
		const dictName = Object.keys(newDictionary)[0];
		const {
			url: { pathname }
		} = get(page);
		const pathnames = pathname.split('/');
		const isPage = pathnames.includes(dictName);

		localizationStore.update((values) => {
			return {
				...values,
				currentPage: isPage ? dictName : values.currentPage,
				dictionaries: {
					...values.dictionaries,
					...newDictionary
				}
			};
		});
		return dictName;
	};

	const getLang = () => {
		return get(localizationStore).lang;
	};

	const toggleLang = () => {
		const lang = get(localizationStore).lang;
		setLang(getNextFromArray(languages, lang));
	};

	const setLang = (newLang: Languages) => {
		cookie.setItem(localizationKey, newLang); // TODO: move to backend?
		document.documentElement.setAttribute('lang', newLang);
		localizationStore.update((values) => {
			return { ...values, lang: newLang };
		});
	};

	return {
		localizationStore,
		getLang,
		toggleLang,
		setLang,
		initLang
	};
};

const locale = createLocaleStore();
export default locale;
