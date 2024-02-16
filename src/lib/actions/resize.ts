import { createGrabbers } from './helpers/createGrabbers';

type ResizeProps = {
	debug?: boolean;
};

type InitialRectType = {
	width: number;
	height: number;
	x: number;
	y: number;
	left: number;
	top: number;
	right: number;
	bottom: number;
};

// TODO: implement touch events!!!
export const resize = (node: HTMLElement, { debug }: ResizeProps = { debug: false }) => {
	const parentElem = node?.parentElement;

	if (!parentElem) throw new Error('No parent element!');
	let active: HTMLElement | null = null;
	let initialRect: InitialRectType | null = null;
	let initialPos: { x: number; y: number } | null = null;

	const grabberWidth = 10;

	const scrollable = document.createElement('div');
	scrollable.classList.add('scrollable-wrapper');
	scrollable.style.width = '100%';
	scrollable.style.height = '100%';
	scrollable.style.overflow = 'auto';
	scrollable.innerHTML = node.innerHTML;
	node.innerHTML = '';
	node.appendChild(scrollable);
	node.style.overflow = 'hidden';

	node.style.position = 'absolute';
	node.style.userSelect = 'none';

	const onMousedown = (event: MouseEvent) => {
		active = event.target as HTMLElement;
		if (!active) throw new Error('No active element!');

		const rect = node.getBoundingClientRect();

		initialRect = {
			width: rect.width,
			height: rect.height,
			x: rect.x,
			y: rect.y,
			left: rect.left,
			top: rect.top,
			right: rect.right,
			bottom: rect.bottom
		};

		initialPos = { x: event.pageX, y: event.pageY };
		debug && (active.style.opacity = '0.5');
	};

	const onEnter = (event: MouseEvent) => {
		if (event?.target) (event.target as HTMLElement).style.opacity = '0.5';
	};

	const onLeave = (event: MouseEvent) => ((event.target as HTMLElement).style.opacity = '0.1');

	const onMove = (event: MouseEvent) => {
		if (!active) return;
		if (!initialRect) return;
		if (!initialPos) return;
		const dirData = active.dataset.name as string;
		if (!dirData) throw new Error('No direction!');

		const directions = dirData.split('-');
		let delta;

		if (directions.includes('right')) {
			delta = event.pageX - initialPos.x;
			node.style.width = `${initialRect.width + delta}px`;
		}

		if (directions.includes('left')) {
			delta = initialPos.x - event.pageX;
			node.style.left = `${window.scrollX + initialRect.left - delta}px`;
			node.style.width = `${initialRect.width + delta}px`;
		}

		if (directions.includes('top')) {
			delta = initialPos.y - event.pageY;
			node.style.top = `${window.scrollY + initialRect.top - delta}px`;
			node.style.height = `${initialRect.height + delta}px`;
		}

		if (directions.includes('bottom')) {
			delta = event.pageY - initialPos.y;
			node.style.height = `${initialRect.height + delta}px`;
		}
	};

	const onMouseup = () => {
		if (!active) return;
		debug && (active.style.opacity = '0.1');
		active = null;
		initialRect = null;
		initialPos = null;
	};

	const grabbers = createGrabbers(node, { grabberWidth, debug, onEnter, onLeave, onMousedown });

	window.addEventListener('mousemove', onMove);
	window.addEventListener('mouseup', onMouseup);

	return {
		destroy() {
			window.removeEventListener('mousemove', onMove);
			window.removeEventListener('mousemove', onMousedown);

			grabbers.forEach((grabber) => {
				grabber.addEventListener('mouseenter', onEnter);
				grabber.addEventListener('mouseleave', onLeave);
				grabber.addEventListener('mousedown', onMousedown);
				node.removeChild(grabber);
			});
		}
	};
};
