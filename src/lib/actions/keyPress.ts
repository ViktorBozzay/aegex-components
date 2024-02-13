export const keyPress = (
	node: HTMLElement,
	{ key, action }: { key?: string; action: () => void | SvelteActionReturnType }
) => {
	if (key === undefined || key === '') return;

	const handleKeyPress = (event: KeyboardEvent) => {
		if (event.key === key) action();
	};

	document.addEventListener('keyup', handleKeyPress);

	return () => {
		document.removeEventListener('keyup', handleKeyPress);
	};
};
