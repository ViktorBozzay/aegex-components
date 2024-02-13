import CloseButton from '../components/Buttons/Special/CloseButton/CloseButton.svelte';

type DestroyProps = {
	onDestroy?: () => void;
	delay?: number;
	duration?: number;
	y?: number;
	x?: number;
};

export const destroy = (node: HTMLElement, props?: DestroyProps) => {
	const { onDestroy, delay, duration, y, x } = { delay: 25, duration: 300, y: -20, x: 0, ...props };

	node.style.position = 'relative';

	const fps = 60; // frames per second
	const dt = 1000 / fps; // milliseconds between frames

	const iterations = Math.ceil(duration / dt);

	let to: NodeJS.Timeout | null = null;

	const closeBtn = new CloseButton({
		target: node
	});

	// TODO: fix this issue: because the innerHTML moved into the scrollable-wrapper now the button doesn't works properly
	closeBtn.$on('click', () => {
		onDestroy?.();
		closeBtn.$destroy();
		let i = 0;
		to = setTimeout(() => {
			const interval = setInterval(() => {
				if (i >= iterations) {
					clearInterval(interval);
					node.remove();
				} else {
					node.style.opacity = `${1 - i / iterations}`;
					node.style.transform = `translate(${(x * i) / iterations}px, ${(y * i) / iterations}px)`;
					i = i + 1;
				}
			}, dt);
		}, delay);
	});

	return {
		destroy() {
			to && clearTimeout(to);
		}
	};
};
