import type { Writable } from 'svelte/store';

export type UIContextType = {
	isXXL: Pick<Writable<boolean>, 'subscribe'>;
	isXL: Pick<Writable<boolean>, 'subscribe'>;
	isLG: Pick<Writable<boolean>, 'subscribe'>;
	isMD: Pick<Writable<boolean>, 'subscribe'>;
	isSM: Pick<Writable<boolean>, 'subscribe'>;
	isXS: Pick<Writable<boolean>, 'subscribe'>;
	innerWidth: number;
	toastList: Pick<Writable<Toast[]>, 'subscribe'>;
	addToast: (toast: Omit<Toast, 'id'>) => void;
	removeToast: (id: string) => void;
	aside: Pick<Writable<ComponentType | undefined>, 'subscribe'>;
	insertAside: (element: ComponentType) => void;
	removeAside: () => void;
	pageTitle: Pick<Writable<string>, 'subscribe'>;
	setPageTitle: (title: string) => void;
};
