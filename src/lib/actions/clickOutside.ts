import { hasExcludedElement } from '../utils/hasExcludedElement.js';

export const clickOutside = (node: HTMLElement, { exclude }: { exclude?: string[] } = {}) => {
	const handleClick = (event: MouseEvent) => {
		const isExcluded = hasExcludedElement(event, exclude);

		if (!node.contains(event.target as Node) && !isExcluded && !event.defaultPrevented) {
			node.dispatchEvent(new CustomEvent('outsideClick', { detail: event.target, bubbles: false }));
		}
	};

	document.addEventListener('click', handleClick);

	return {
		destroy() {
			document.removeEventListener('click', handleClick);
		}
	};
};
