import { hasExcludedElement } from '../utils/hasExcludedElement.js';

export const clickInside = (
	node: HTMLElement,
	{
		exclude
	}: {
		exclude?: string[];
	} = {}
) => {
	const handleClick = (event: MouseEvent) => {
		const isExcluded = hasExcludedElement(event, exclude);

		if (node.contains(event.target as Node) && !isExcluded) {
			node.dispatchEvent(new CustomEvent('insideClick', { detail: event.target, bubbles: true }));
		}
	};

	addEventListener('click', handleClick);

	return {
		destroy() {
			removeEventListener('click', handleClick);
		}
	};
};
