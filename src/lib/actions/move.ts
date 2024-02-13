import MoveResetButton from '../components/Movable/MoveResetButton/MoveResetButton.svelte';

// TODO: implement touch events!!!
export type MoveProps = {
	alwaysOnScreen?: boolean;
	addPlaceholder?: boolean;
	moveWithResize?: boolean;
	addReset?: boolean;
	debug?: boolean;
	initialPosition?: { x: number; y: number };
};

export const move = (
	node: HTMLElement,
	{
		alwaysOnScreen = false,
		addPlaceholder = true,
		moveWithResize = false,
		addReset = true,
		debug = false
	}: MoveProps = {}
) => {
	const grabber = node.querySelector('.grabber') as HTMLElement;
	let resetButton: MoveResetButton | null = null;
	let placeholderNode: HTMLDivElement | null = null;
	const nodeParent = node.parentElement!;

	let touched = false;
	let moving = false;

	// to get the correct width we should use getBoundingClientRect again, after set the node position fixed or absolute
	let nodePos = node.getBoundingClientRect();

	node.style.position = alwaysOnScreen ? 'fixed' : 'absolute';
	node.style.transition = 'opacity 0.4s ease';
	const width = nodePos.width;
	const height = nodePos.height;
	let left = nodePos.x + window.scrollX;
	let top = nodePos.y + window.scrollY;
	const initialLeft = left;
	const initialTop = top;

	// node.style.maxWidth = width + 'px';
	node.style.left = left + 'px';
	node.style.top = top + 'px';
	node.style.bottom = 'revert';
	node.style.right = 'revert';

	const initialWindowSize = {
		width: window.innerWidth,
		height: window.innerHeight
	};

  const update = () => {
		const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;

		nodePos = node.getBoundingClientRect();

		const minXLimit = window.scrollX;
		const maxXLimit = window.innerWidth + window.scrollX - nodePos.width - scrollbarWidth;
		const minYLimit = window.scrollY;
		const maxYLimit = window.innerHeight + window.scrollY - nodePos.height;

		if (touched) {
			left = Math.max(minXLimit, Math.min(maxXLimit, left));
			top = Math.max(minYLimit, Math.min(maxYLimit, top));

			// TODO: if this is inside the if then on windows resize the node will be in the wrong position, if it is outside the if then on appearing error element of input fields the node will be in wrong position
			node.style.top = `${top}px`;
			node.style.left = `${left}px`;
		}

		if (debug) node.style.color = touched ? 'green' : 'var(--primary-text)';
	};

	// REFACTOR: inspect this feature should placed in other action?
	const handleWindowResize = () => {
		if (!moveWithResize) return;
		const { innerWidth, innerHeight } = window;

		const relativePos = {
			x: initialWindowSize.width - innerWidth,
			y: initialWindowSize.height - innerHeight
		};

		left = window.scrollX + left - width * (relativePos.x / window.innerWidth);
		top = window.scrollY + top - height * (relativePos.y / window.innerHeight);

		update();

		initialWindowSize.width = window.innerWidth;
		initialWindowSize.height = window.innerHeight;
	};

	const createPlaceholder = () => {
		placeholderNode = document.createElement('div');

		placeholderNode.style.maxWidth = width + 'px';
		placeholderNode.style.height = (addPlaceholder ? height : 0) + 'px';
		nodeParent.insertBefore(placeholderNode, node.nextSibling);

		const resizeObserver = new ResizeObserver(() => {
			const { x, y } = placeholderNode?.getBoundingClientRect() ?? {};

			if (!touched) {
				left = x ?? initialLeft;
				top = y ?? initialTop;
				update();
			}
		});
		resizeObserver.observe(nodeParent);
	};
	addReset && createPlaceholder();

	const removeResetButton = () => {
		if (resetButton) {
			resetButton.$destroy();
			resetButton = null;
		}
	};

	const createResetButton = () => {
		if (addReset && !resetButton) {
			resetButton = new MoveResetButton({
				props: {
					action: () => {
						node.style.transition = 'left 0.2s ease, top 0.2s ease';
						const { x, y } = placeholderNode?.getBoundingClientRect() ?? {};
						left = window.scrollX + (x ?? initialLeft);
						top = window.scrollY + (y ?? initialTop);
						touched = false;
						update();
						const resetTransition = () => {
							node.style.transition = 'left 0s ease, top 0s ease';
							node.removeEventListener('transitionend', resetTransition);
						};
						node.addEventListener('transitionend', resetTransition);
					}
				},
				target: grabber
			});
		}
	};
	createResetButton();

	const handleMouseMove = (e: MouseEvent) => {
		if (moving) {
			update();
			left += e.movementX;
			top += e.movementY;
			touched = true;
		}
	};

	const handleMouseUp = () => {
		moving = false;
		node.style.opacity = '1';
	};

	const handleMouseDown = () => {
		nodePos = node.getBoundingClientRect();
		left = nodePos.x + window.scrollX;
		top = nodePos.y + window.scrollY;
		moving = true;
		node.style.opacity = '0.5';
	};

	// TODO: is it the right place to set the zIndex?
	// node.style.zIndex = '20';
	node.style.userSelect = 'none';
	(grabber ?? node).style.cursor = 'grab';

	const events = [
		{ target: window, event: 'mousemove', action: handleMouseMove },
		{ target: window, event: 'resize', action: handleWindowResize },
		{ target: node, event: 'mouseup', action: handleMouseUp },
		{ target: grabber ?? node, event: 'mousedown', action: handleMouseDown }
	];

	// TODO: some type issue is here
	events.forEach(({ target, event, action }) => {
		target.addEventListener(event, action);
	});

	return {
		destroy() {
			node.style.zIndex = '';
			node.style.userSelect = '';
			(grabber ?? node).style.cursor = '';

			// TODO: some type issue is here
			events.forEach(({ target, event, action }) => {
				target.removeEventListener(event, action);
			});
		}
	};
};
